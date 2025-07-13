import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { boolean } from "zod/v4";
import { Snackbar, Alert } from "@mui/material";

export function RegisterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [otpScreen, setOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneToVerify, setPhoneToVerify] = useState("");
  const nav = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    gstin: "",
  });

  const userType = searchParams.get("type") || "retailer";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // First step: Register and send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        ...formData,
        userType,
        otp: "", // Initial step
      });

      const { message, requireOtp } = res.data;

      if (requireOtp) {
        setPhoneToVerify(formData.phoneNumber);
        setSuccessMsg(message || "OTP sent to your phone");
        setOpenSuccess(true);
        setOtpScreen(true);
      } else {
        setSuccessMsg(message || "Registration successful");
        setOpenSuccess(true);
        setTimeout(() => nav("/login"), 1000); // delay before redirect
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Error occurred during registration"
      );
      setOpenError(true);
    }
  };

  // Second step: Submit OTP
  const submitOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        ...formData,
        userType,
        otp,
      });

      setSuccessMsg(
        res.data.message || "Phone verified and account created successfully!"
      );
      setOpenSuccess(true);
      setOtpScreen(false);
      setTimeout(() => nav("/login"), 1000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "OTP verification failed");
      setOpenError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Navigation Tabs */}
        <div className="max-w-md mx-auto mb-8">
          <nav className="flex rounded-lg overflow-hidden border border-green-600">
            <button
              onClick={() => setSearchParams({ type: "retailer" })}
              className={`flex-1 py-3 px-6 text-center font-semibold transition-colors ${
                userType === "retailer"
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600 hover:bg-green-50"
              }`}
            >
              Register as Retailer
            </button>
            <button
              onClick={() => setSearchParams({ type: "wholesaler" })}
              className={`flex-1 py-3 px-6 text-center font-semibold transition-colors ${
                userType === "wholesaler"
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600 hover:bg-green-50"
              }`}
            >
              Register as Wholesaler
            </button>
          </nav>
        </div>

        {/* Registration Form */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            {userType === "retailer"
              ? "Retailer Registration"
              : "Wholesaler Registration"}
          </h2>

          {!otpScreen ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
              />
              <Input
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
              />

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter 10 digit number"
                    className="flex-1 px-4 py-2 border border-l-0 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <Input
                label="GSTIN"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Register Now
              </button>
            </form>
          ) : (
            <form onSubmit={submitOtpVerification} className="space-y-4">
              <label className="block text-center text-sm font-medium text-gray-700 mb-2">
                OTP sent to +91{phoneToVerify}
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                required
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              >
                Verify & Complete Registration
              </button>
            </form>
          )}
        </div>
      </div>
      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={7000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

// ✅ Reusable Input Component
function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
    </div>
  );
}
