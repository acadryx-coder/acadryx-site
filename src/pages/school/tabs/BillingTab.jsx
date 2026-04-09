// src/pages/school/tabs/BillingTab.jsx
import { useState, useRef } from 'react'
import TopUpModal from '../components/TopUpModal'

export default function BillingTab({ billingData, schoolId, branchId, currencySymbol, onRefresh }) {
  const [showTopUpModal, setShowTopUpModal] = useState(false)
  const scrollRef = useRef(null)

  const handleTopUpSuccess = () => {
    setShowTopUpModal(false)
    onRefresh()
  }

  const formatAmount = (amount) => {
    if (amount === null || amount === undefined) return '0'
    return amount.toLocaleString()
  }

  // Mouse drag scroll for luxury feel
  let isDown = false
  let startX
  let scrollLeft

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return
    isDown = true
    startX = e.pageX - scrollRef.current.offsetLeft
    scrollLeft = scrollRef.current.scrollLeft
    scrollRef.current.style.cursor = 'grabbing'
  }

  const handleMouseLeave = () => {
    isDown = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }

  const handleMouseUp = () => {
    isDown = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }

  const handleMouseMove = (e) => {
    if (!isDown || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="billing-tab">
      <div className="balance-card">
        <div className="balance-label">Current Balance</div>
        <div 
          ref={scrollRef}
          className="balance-amount"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: 'grab', userSelect: 'none' }}
        >
          {currencySymbol || '₦'}{formatAmount(billingData?.balance)}
        </div>
        <button className="topup-btn-large" onClick={() => setShowTopUpModal(true)}>
          Top Up Wallet
        </button>
      </div>

      <div className="transactions-section">
        <h3>Transaction Summary</h3>
        <div className="summary-card">
          <div className="summary-row">
            <span>Total Deposits:</span>
            <strong>{currencySymbol || '₦'}{formatAmount(billingData?.total_deposits)}</strong>
          </div>
          <div className="summary-row">
            <span>Total Costs (Current Term):</span>
            <strong>{currencySymbol || '₦'}{formatAmount(billingData?.total_cost)}</strong>
          </div>
          <div className="summary-row highlight">
            <span>Available Balance:</span>
            <strong className={billingData?.balance >= 0 ? 'positive' : 'negative'}>
              {currencySymbol || '₦'}{formatAmount(billingData?.balance)}
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
