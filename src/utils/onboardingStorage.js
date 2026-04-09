// utils/onboardingStorage.js
// Manages temporary storage of onboarding progress

const STORAGE_KEY = 'acadryx_onboarding_data'
const LAST_STEP_KEY = 'acadryx_onboarding_step'

/**
 * Save onboarding form data to localStorage
 * @param {Object} formData - The current form data state
 * @param {number} step - Current step number (1-5)
 */
export function saveOnboardingProgress(formData, step) {
  try {
    const dataToStore = {
      formData,
      step,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore))
    localStorage.setItem(LAST_STEP_KEY, step.toString())
    console.log('Onboarding saved:', { step })
    return true
  } catch (error) {
    console.error('Failed to save onboarding progress:', error)
    return false
  }
}

/**
 * Load saved onboarding progress from localStorage
 * @returns {Object|null} Saved data or null if not found/invalid
 */
export function loadOnboardingProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      console.log('No saved onboarding data found')
      return null
    }
    
    const data = JSON.parse(saved)
    console.log('Onboarding loaded:', { step: data.step, savedAt: data.savedAt })
    
    // Check if saved data is not too old (e.g., 7 days)
    const savedAt = new Date(data.savedAt)
    const daysSince = (Date.now() - savedAt.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSince > 7) {
      console.log('Saved data is too old, clearing')
      clearOnboardingProgress()
      return null
    }
    
    return data
  } catch (error) {
    console.error('Failed to load onboarding progress:', error)
    return null
  }
}

/**
 * Clear onboarding progress from localStorage
 */
export function clearOnboardingProgress() {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(LAST_STEP_KEY)
  console.log('Onboarding progress cleared')
}

/**
 * Get the last saved step number
 * @returns {number|null} Step number or null
 */
export function getLastSavedStep() {
  const step = localStorage.getItem(LAST_STEP_KEY)
  return step ? parseInt(step, 10) : null
}
