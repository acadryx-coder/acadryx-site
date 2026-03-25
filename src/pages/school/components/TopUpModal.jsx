// src/pages/school/components/TopUpModal.jsx
import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'

// Inner component — only rendered once we have user email, so hook gets real values
function PaymentForm({ amount, schoolId, branchId, currencySymbol, userEmail, userName, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFlutterPayment = useFlutterwave({
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `topup_${schoolId}_${branchId}_${Date.now()}`,
    amount: parseFloat(amount),
    currency: 'NGN',
    payment_options: 'card, banktransfer, ussd',
    customer: {
      email: userEmail,
      name: userName,
    },
    customizations: {
      title: 'Acadryx - School Wallet Top Up',
      description: 'Top up wallet for school',
      logo: 'https://acadryx.com/logo.png',
    },
    meta: {
      school_id: schoolId,
      branch_id: branchId,
    }
  })

  const triggerPayment = () => {
    setLoading(true)
    setError(null)

    handleFlutterPayment({
      callback: async (response) => {
        if (response.status === 'successful') {
          const { error: depositError } = await supabase
            .schema('billing')
            .rpc('record_deposit', {
              p_school_branch_id: branchId,
              p_amount: parseFloat(amount),
              p_currency_symbol: currencySymbol || '₦'
            })

          if (depositError) {
            console.error('Failed to record deposit:', depositError)
            setError('Payment successful but deposit recording failed. Please contact support.')
          } else {
            onSuccess()
          }
        } else {
          setError('Payment failed or was cancelled')
        }
        closePaymentModal()
        setLoading(false)
      },
      onClose: () => {
        setLoading(false)
      }
    })
  }

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <div className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="btn-primary" onClick={triggerPayment} disabled={loading}>
          {loading ? 'Processing...' : `Pay ${currencySymbol || '₦'}${amount}`}
        </button>
      </div>
    </div>
  )
}

// Outer component — collects amount and user, then mounts PaymentForm
export default function TopUpModal({ schoolId, branchId, currencySymbol, onClose, onSuccess }) {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState('')
  const [loadingUser, setLoadingUser] = useState(false)

  const handleProceed = async (e) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) < 100) {
      setError('Minimum amount is 100')
      return
    }

    setLoadingUser(true)
    setError(null)

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      setError('Please log in to continue')
      setLoadingUser(false)
      return
    }

    setUserEmail(user.email)
    setUserName(user.user_metadata?.full_name || '')
    setLoadingUser(false)
  }
console.log(branchId)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Top Up Wallet</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {!userEmail ? (
            <form onSubmit={handleProceed}>
              <div className="form-group">
                <label>Amount ({currencySymbol || '₦'})</label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  autoFocus
                />
                <small>Minimum: {currencySymbol || '₦'}100</small>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loadingUser}>
                  {loadingUser ? 'Loading...' : 'Continue →'}
                </button>
              </div>
            </form>
          ) : (
            <PaymentForm
              amount={amount}
              schoolId={schoolId}
              branchId={branchId}
              currencySymbol={currencySymbol}
              userEmail={userEmail}
              userName={userName}
              onClose={onClose}
              onSuccess={onSuccess}
            />
          )}
        </div>
      </div>
    </div>
  )
}
