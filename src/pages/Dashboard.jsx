// Dashboard.jsx — Acadryx Owner Control Panel
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import '../styles/dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [account, setAccount] = useState(null)
  const [schools, setSchools] = useState([])
  const [editingAccount, setEditingAccount] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      const [{ data: acct }, { data: schoolData }] = await Promise.all([
        supabase
          .from('acadryx_accounts')
          .select('*')
          .eq('id', user.id)
          .single(),
        supabase
          .from('schools')
          .select(`
            *,
            country:countries(name, currency, currency_symbol, price_per_student),
            branches:school_branches(id, branch_name, is_main),
            sessions:academic_sessions(
              id, session_name, start_year, end_year, is_active,
              terms:academic_terms(id, term_name, is_active, is_closed, term_balance, term_balance_paid, created_at, closed_at)
            ),
            transactions:billing_transactions(id, transaction_type, amount, currency, status, description, created_at)
          `)
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false }),
      ])

      console.log(account)

      setAccount(acct)
      setSchools(schoolData || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const unpaidSetupFees = schools.filter(
    (s) => !s.setup_fee_paid && s.is_active
  )
  const overdueSchools = schools.filter(
    (s) =>
      !s.setup_fee_paid &&
      s.setup_fee_due_date &&
      new Date(s.setup_fee_due_date) < new Date()
  )

  if (loading) {
    return (
      <div className="dash-shell">
        <div className="dash-loading">
          <div className="dash-spinner" />
          <p>Loading your dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dash-shell">
      {/* Top bar */}
      <div className="dash-topbar">
        <span className="dash-logo" onClick={() => navigate('/')}>Acadryx</span>
        <div className="dash-topbar-right">
          <button className="dash-account-btn" onClick={() => setEditingAccount(true)}>
            <span className="account-avatar">
              {account?.full_name?.[0] || account?.email?.[0] || 'A'}
            </span>
            <span className="account-name">{account?.full_name || account?.email}</span>
          </button>
          <button className="dash-logout" onClick={handleLogout}>Log out</button>
        </div>
      </div>

      <div className="dash-body">
        {/* Alerts */}
        {overdueSchools.length > 0 && (
          <div className="dash-alert danger">
            <strong>🚨 {overdueSchools.length} school{overdueSchools.length > 1 ? 's' : ''} overdue</strong>
            {' '}— Setup fee deadline passed. Pay now to restore access:{' '}
            {overdueSchools.map((s) => s.school_name).join(', ')}
          </div>
        )}
        {unpaidSetupFees.filter((s) => new Date(s.setup_fee_due_date) >= new Date()).length > 0 && (
          <div className="dash-alert warning">
            <strong>⚠ Setup fee pending</strong>
            {' '}— Pay ₦50,000 within the deadline to keep your school active.
          </div>
        )}

        {error && <div className="dash-alert danger">{error}</div>}

        {/* Header row */}
        <div className="dash-page-header">
          <div>
            <h1>Your Schools</h1>
            <p>{schools.length} school{schools.length !== 1 ? 's' : ''} · {account?.email}</p>
          </div>
          <button className="dash-create-btn" onClick={() => navigate('/onboarding')}>
            + Create School
          </button>
        </div>

        {/* Empty state */}
        {schools.length === 0 && (
          <div className="dash-empty">
            <div className="empty-icon">🏫</div>
            <h3>No schools yet</h3>
            <p>Create your first school to get started</p>
            <button className="dash-create-btn" onClick={() => navigate('/onboarding')}>
              Create Your First School
            </button>
          </div>
        )}

        {/* School cards */}
        <div className="schools-list">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} onRefresh={loadAll} />
          ))}
        </div>
      </div>

      {/* Account settings modal */}
      {editingAccount && (
        <AccountModal
          account={account}
          onClose={() => setEditingAccount(false)}
          onSaved={(updated) => { setAccount(updated); setEditingAccount(false) }}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// School Card
// ─────────────────────────────────────────────
function SchoolCard({ school, onRefresh }) {
  const [tab, setTab] = useState('overview')
  const [editingSettings, setEditingSettings] = useState(false)

  const activeSession = school.sessions?.find((s) => s.is_active)
  const activeTerm = activeSession?.terms?.find((t) => t.is_active && !t.is_closed)
  const setupFeeDue = school.setup_fee_due_date ? new Date(school.setup_fee_due_date) : null
  const daysLeft = setupFeeDue ? Math.ceil((setupFeeDue - new Date()) / 86400000) : null
  const setupOverdue = daysLeft !== null && daysLeft < 0
  const setupWarning = daysLeft !== null && daysLeft >= 0 && daysLeft <= 3

  const pendingSetupFee = school.transactions?.find(
    (t) => t.transaction_type === 'setup_fee' && t.status === 'pending'
  )

  const termBalance = activeTerm?.term_balance || 0
  const termBalancePaid = activeTerm?.term_balance_paid

  // Count students from profiles - not available in this query, use school stats
  const totalStudents = school.total_students || 0
  const totalStaff = school.total_staff || 0

  return (
    <div className={`school-card ${setupOverdue ? 'overdue' : ''}`}>
      {/* Card header */}
      <div className="school-card-header" style={{ '--brand': school.brand_color || '#1a6bff' }}>
        <div className="school-card-brand">
          <div className="school-initial" style={{ background: school.brand_color || '#1a6bff' }}>
            {school.school_name[0]}
          </div>
          <div>
            <div className="school-card-name">{school.school_name}</div>
            <div className="school-card-slug">acadryx.vercel.app?school={school.slug}</div>
          </div>
        </div>
        <div className="school-card-badges">
          {school.is_active
            ? <span className="badge green">Active</span>
            : <span className="badge red">Suspended</span>
          }
          {!school.setup_fee_paid && setupOverdue && <span className="badge red">Fee Overdue</span>}
          {!school.setup_fee_paid && !setupOverdue && <span className="badge yellow">Fee Pending</span>}
          {school.setup_fee_paid && <span className="badge teal">Fee Paid</span>}
        </div>
      </div>

      {/* Setup fee banner */}
      {!school.setup_fee_paid && (
        <div className={`fee-banner ${setupOverdue ? 'danger' : setupWarning ? 'warn' : 'info'}`}>
          {setupOverdue
            ? `⚠ Setup fee overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''}. Pay now to restore access.`
            : `Setup fee: ₦50,000 due in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`
          }
          <button className="fee-pay-btn">Pay Now</button>
        </div>
      )}

      {/* Stats row */}
      <div className="school-stats-row">
        <div className="stat-pill">
          <span className="stat-val">{totalStudents}</span>
          <span className="stat-lbl">Students</span>
        </div>
        <div className="stat-pill">
          <span className="stat-val">{totalStaff}</span>
          <span className="stat-lbl">Staff</span>
        </div>
        <div className="stat-pill">
          <span className="stat-val">{activeSession?.session_name || '—'}</span>
          <span className="stat-lbl">Session</span>
        </div>
        <div className="stat-pill">
          <span className="stat-val">{activeTerm?.term_name || '—'}</span>
          <span className="stat-lbl">Current Term</span>
        </div>
        {termBalance > 0 && (
          <div className={`stat-pill ${termBalancePaid ? '' : 'warn-pill'}`}>
            <span className="stat-val">
              {school.country?.currency_symbol || '₦'}{termBalance.toLocaleString()}
            </span>
            <span className="stat-lbl">{termBalancePaid ? 'Term Paid' : 'Term Balance'}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="card-tabs">
        {['overview', 'billing', 'settings'].map((t) => (
          <button
            key={t}
            className={`card-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <div className="card-tab-actions">
          {school.is_active && (
            <a
              href={`https://acadryx.vercel.app?school=${school.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-visit-btn"
            >
              Open School Portal ↗
            </a>
          )}
        </div>
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <OverviewTab school={school} activeSession={activeSession} activeTerm={activeTerm} />
      )}
      {tab === 'billing' && (
        <BillingTab school={school} onRefresh={onRefresh} />
      )}
      {tab === 'settings' && (
        <SettingsTab school={school} onRefresh={onRefresh} />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Overview Tab
// ─────────────────────────────────────────────
function OverviewTab({ school, activeSession, activeTerm }) {
  const allTerms = activeSession?.terms || []

  return (
    <div className="tab-content">
      <div className="overview-grid">
        <div className="overview-section">
          <div className="ov-title">School Details</div>
          <OvRow label="Country" value={school.country?.name || '—'} />
          <OvRow label="Contact" value={school.contact_email} />
          {school.contact_phone && <OvRow label="Phone" value={school.contact_phone} />}
          {school.address && <OvRow label="Address" value={`${school.address}${school.city ? ', ' + school.city : ''}${school.state ? ', ' + school.state : ''}`} />}
          <OvRow label="Pricing" value={school.country ? `${school.country.currency_symbol}${school.country.price_per_student} per student` : '—'} />
        </div>

        {activeSession && (
          <div className="overview-section">
            <div className="ov-title">Academic Calendar — {activeSession.session_name}</div>
            {allTerms.map((term) => (
              <div key={term.id} className="term-row">
                <span className="term-name">{term.term_name}</span>
                <div className="term-status">
                  {term.is_closed
                    ? <span className="badge teal">Closed</span>
                    : term.is_active
                    ? <span className="badge green">Active</span>
                    : <span className="badge grey">Upcoming</span>
                  }
                  {term.term_balance > 0 && (
                    <span className={`badge ${term.term_balance_paid ? 'teal' : 'yellow'}`}>
                      {school.country?.currency_symbol || '₦'}{term.term_balance.toLocaleString()} {term.term_balance_paid ? '✓' : 'unpaid'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function OvRow({ label, value }) {
  return (
    <div className="ov-row">
      <span className="ov-label">{label}</span>
      <span className="ov-val">{value}</span>
    </div>
  )
}

// ─────────────────────────────────────────────
// Billing Tab
// ─────────────────────────────────────────────
function BillingTab({ school, onRefresh }) {
  const transactions = school.transactions || []
  const totalPending = transactions
    .filter((t) => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="tab-content">
      {totalPending > 0 && (
        <div className="billing-summary">
          <div>
            <div className="billing-amount">
              {school.country?.currency_symbol || '₦'}{totalPending.toLocaleString()}
            </div>
            <div className="billing-label">Total outstanding</div>
          </div>
          <button className="pay-all-btn">Pay All Outstanding</button>
        </div>
      )}

      <div className="transactions-list">
        {transactions.length === 0 && (
          <div className="empty-transactions">No transactions yet</div>
        )}
        {transactions.map((t) => (
          <div key={t.id} className="transaction-row">
            <div className="txn-left">
              <div className="txn-type">
                {t.transaction_type === 'setup_fee' ? '🏫 Setup Fee' : '📊 Result Publication'}
              </div>
              <div className="txn-desc">{t.description}</div>
              <div className="txn-date">{new Date(t.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </div>
            <div className="txn-right">
              <div className="txn-amount">{school.country?.currency_symbol || '₦'}{t.amount.toLocaleString()}</div>
              <span className={`badge ${t.status === 'paid' ? 'green' : t.status === 'failed' ? 'red' : 'yellow'}`}>
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Settings Tab
// ─────────────────────────────────────────────
function SettingsTab({ school, onRefresh }) {
  const [form, setForm] = useState({
    school_name: school.school_name || '',
    short_name: school.short_name || '',
    address: school.address || '',
    city: school.city || '',
    state: school.state || '',
    contact_email: school.contact_email || '',
    contact_phone: school.contact_phone || '',
    brand_color: school.brand_color || '#1a6bff',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [err, setErr] = useState(null)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  async function save() {
    setSaving(true)
    setErr(null)
    const { error } = await supabase
      .from('schools')
      .update(form)
      .eq('id', school.id)
    setSaving(false)
    if (error) { setErr(error.message); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    onRefresh()
  }

  return (
    <div className="tab-content">
      <div className="settings-grid">
        <div className="settings-field full">
          <label>School Name</label>
          <input value={form.school_name} onChange={(e) => set('school_name', e.target.value)} />
        </div>
        <div className="settings-field">
          <label>Short Name</label>
          <input value={form.short_name} onChange={(e) => set('short_name', e.target.value)} placeholder="e.g. GFA" />
        </div>
        <div className="settings-field">
          <label>Brand Colour</label>
          <div className="settings-color">
            <input type="color" value={form.brand_color} onChange={(e) => set('brand_color', e.target.value)} />
            <span>{form.brand_color}</span>
          </div>
        </div>
        <div className="settings-field full">
          <label>Address</label>
          <input value={form.address} onChange={(e) => set('address', e.target.value)} />
        </div>
        <div className="settings-field">
          <label>City</label>
          <input value={form.city} onChange={(e) => set('city', e.target.value)} />
        </div>
        <div className="settings-field">
          <label>State / Province</label>
          <input value={form.state} onChange={(e) => set('state', e.target.value)} />
        </div>
        <div className="settings-field">
          <label>Contact Email</label>
          <input type="email" value={form.contact_email} onChange={(e) => set('contact_email', e.target.value)} />
        </div>
        <div className="settings-field">
          <label>Contact Phone</label>
          <input type="tel" value={form.contact_phone} onChange={(e) => set('contact_phone', e.target.value)} />
        </div>
      </div>

      {err && <div className="settings-error">{err}</div>}

      <div className="settings-actions">
        {saved && <span className="settings-saved">✓ Saved</span>}
        <button className="settings-save-btn" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Account Modal
// ─────────────────────────────────────────────
function AccountModal({ account, onClose, onSaved }) {
  const [form, setForm] = useState({
    full_name: account?.full_name || '',
    phone: account?.phone || '',
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState(null)

  async function save() {
    setSaving(true)
    const { data, error } = await supabase
      .from('acadryx_accounts')
      .update(form)
      .eq('id', account.id)
      .select()
      .single()
    setSaving(false)
    if (error) { setErr(error.message); return }
    onSaved(data)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Account Settings</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="settings-field full">
            <label>Full Name</label>
            <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          </div>
          <div className="settings-field full">
            <label>Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="settings-field full">
            <label>Email</label>
            <input value={account?.email || ''} disabled className="disabled" />
            <small>Email cannot be changed here. Contact support.</small>
          </div>
          {err && <div className="settings-error">{err}</div>}
        </div>

        <div className="modal-footer">
          <button className="dash-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="settings-save-btn" onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
