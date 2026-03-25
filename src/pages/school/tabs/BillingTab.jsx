// src/pages/school/tabs/BillingTab.jsx
import { useState } from 'react'
import TopUpModal from '../components/TopUpModal'

export default function BillingTab({ billingData, schoolId, branchId, currencySymbol, onRefresh }) {
  const [showTopUpModal, setShowTopUpModal] = useState(false)

  const handleTopUpSuccess = () => {
    setShowTopUpModal(false)
    onRefresh()
  }

  return (
    <div className="billing-tab">
      <div className="balance-card">
        <div className="balance-label">Current Balance</div>
        <div className="balance-amount">{currencySymbol || '₦'}{billingData?.balance?.toLocaleString() || 0}</div>
        <button className="topup-btn-large" onClick={() => setShowTopUpModal(true)}>
          Top Up Wallet
        </button>
      </div>

      <div className="transactions-section">
        <h3>Transaction Summary</h3>
        <div className="summary-card">
          <div className="summary-row">
            <span>Total Deposits:</span>
            <strong>{currencySymbol || '₦'}{billingData?.total_deposits?.toLocaleString() || 0}</strong>
          </div>
          <div className="summary-row">
            <span>Total Costs (Current Term):</span>
            <strong>{currencySymbol || '₦'}{billingData?.total_cost?.toLocaleString() || 0}</strong>
          </div>
          <div className="summary-row highlight">
            <span>Available Balance:</span>
            <strong className={billingData?.balance >= 0 ? 'positive' : 'negative'}>
              {currencySymbol || '₦'}{billingData?.balance?.toLocaleString() || 0}
            </strong>
          </div>
        </div>
        <div className="billing-note">
          💡 Costs are calculated in real-time based on active features and current user counts.
        </div>
      </div>

      {showTopUpModal && (
        <TopUpModal
          schoolId={schoolId}
          branchId={branchId}
          currencySymbol={currencySymbol}
          onClose={() => setShowTopUpModal(false)}
          onSuccess={handleTopUpSuccess}
        />
      )}
    </div>
  )
}