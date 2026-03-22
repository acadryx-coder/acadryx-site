import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import '../../styles/auth.css'

export default function SignupPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("Creating account...")
  const [error, setError] = useState(null)
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    otherNames: '',
    profilePic: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingText("Uploading Profile Pic.")
    setLoading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`; // or `${data.user.id}/${fileName}` if you have user ID
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile_pictures')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      console.log(uploadData)
      const { data: { publicUrl } } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(filePath);
      console.log(publicUrl)
      setFormData({ ...formData, profilePic: publicUrl });
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload profile picture');
    } finally {
      setLoading(false);
      setLoadingText("Creating Account...");
    }
  }

  async function handleSignup(e) {
    e.preventDefault()
    setLoadingText("Creating account...")
    setLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: formData.firstName,
            surname: formData.surname,
            other_names: formData.otherNames,
            phone: formData.phone
          }
        }
      })

      console.log("DATA", data, "ERROR", error);

      if (error) throw error

      if (data.user && data.user.identities && data.user.identities.length > 0) {
        const { error: rpcError } = await supabase
         .schema('acadryx')
         .rpc('create_acadryx_user', {
            p_user_id: data.user.id,
            p_email: data.user.email,
            p_first_name: formData.firstName,
            p_surname: formData.surname,
            p_other_names: formData.otherNames || null,
            p_phone: formData.phone || null,
            p_profile_pic_url: formData.profilePic || null,
        })

        if (rpcError) throw rpcError
        
        // Check if email confirmation is required
        if (data.session === null) {
          // Email confirmation required - show message
          setShowConfirmationMessage(true)
        } else {
          // No confirmation needed - redirect immediately
          navigate('/dashboard')
        }
      }
      else {
      	setError("Account already exists. Please log in or contact customer care if encountering issues");
      	return;
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Create Your Acadryx Account</h1>
          <p>Start managing your school infrastructure</p>
        </div>

        {showConfirmationMessage ? (
          // CONFIRMATION MESSAGE (shown after signup if email confirmation needed)
          <div className="confirmation-message">
            <div className="confirmation-icon">📧</div>
            <h2>Check Your Email</h2>
            <p>
              {"We've sent a confirmation link to "}<strong>{formData.email}</strong>
            </p>
            <p>
              Click the link in the email to activate your account. It may take a few minutes to arrive.
            </p>
            <button 
              onClick={() => navigate('/login')} 
              className="btn-secondary" 
              style={{marginTop: 20}}
            >
              Go to Login
            </button>
          </div>
        ) : (
          // SIGNUP FORM (shown initially)
          <>
            <form onSubmit={handleSignup} className="auth-form">
              <div className="form-group">
                <label htmlFor="profilePic">Profile Picture</label>
                <div className="file-input-wrapper">
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  {formData.profilePic && (
                    <img 
                      src={formData.profilePic} 
                      alt="Preview" 
                      className="preview-image"
                    />
                  )}
                </div>
                {loadingText === "Uploading Profile Pic." && <div className="upload-status">Uploading...</div>}
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  id="surname"
                  type="text"
                  placeholder="Doe"
                  value={formData.surname}
                  onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="otherNames">Other Names (Optional)</label>
                <input
                  id="otherNames"
                  type="text"
                  placeholder="Middle name(s)"
                  value={formData.otherNames}
                  onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
                />
              </div>

			  <div className="form-group">
			    <label htmlFor="phone">Phone Number (Optional)</label>
			    <input
			      id="phone"
			      type="tel"
			      placeholder="08129735338"
			      value={formData.phone}
			      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
			    />
			  </div>
			  
			  <div className="form-group">
			    <label htmlFor="email">Email Address</label>
			    <input
			      id="email"
			      type="email"
			      placeholder="you@example.com"
			      value={formData.email}
			      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
			      required
			    />
			  </div>
			  
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" disabled={loading} className="auth-button">
                {loading ? loadingText : 'Sign Up'}
              </button>
            </form>

            <div className="auth-footer">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </>
        )}

        <div className="auth-back">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
