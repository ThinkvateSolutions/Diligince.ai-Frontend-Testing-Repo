import React from "react";
import { useState, useEffect } from "react";

import { 
  Building, 
  FileText, 
  Users, 
  CreditCard, 
  Bell, 
  Lock,
  Edit,
  Upload,
  Plus,
  Trash,
  Mail,
  Phone,
  Globe,
  Calendar,
  Save,
  X,
  Home,
  User
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";



const Payment = () => {
 const [accountholdername, setAccountholdername] = useState("");
  const [accountnumber, setAccountnumber] = useState(null);
  const [bankname, setBankname] = useState("");
  const [ifsccode, setIfsccode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("bank"); // default value
  const [invoicePreferences, setInvoicePreferences] = useState({
   receiveByEmail: true,
   monthlyConsolidated: true,
   includePONumber: true,
    });
    const [paymentEdit, setPaymentEdit] = useState(false);
    const [originalpaydata, setOriginalpayData] = useState<payData | null>(null);
    const [accountInputStage, setAccountInputStage] = useState('initial'); // 'initial' or 'reentry'
const [firstAccountNumber, setFirstAccountNumber] = useState('');

   
    type payData = {
  accountholdername: string;
  accountnumber: number;
  bankname: string;
  ifsccode: string;
  selectedPayment: string;
  invoicePreferences: {
    receiveByEmail: boolean;
    monthlyConsolidated: boolean;
    includePONumber: boolean;
  };
};

const handlepaySaveChanges = () => {
  const paymentData = {
    accountholdername,
    accountnumber,
    bankname,
    ifsccode,
    selectedPayment,
    invoicePreferences,
  };

  console.log("Saving profile data:", paymentData);
 
  localStorage.setItem("paymentSettings", JSON.stringify(paymentData));
   localStorage.removeItem("paymentSettings");
  // Optional: send to backend here
  // await axios.post('/api/save-profile', profileData);
  toast.success("Payment settings updated successfully");
  setPaymentEdit(false);
};

const enablepaymentEditMode = () => {
  setOriginalpayData({
    accountholdername,
    accountnumber,
    bankname,
    ifsccode,
    selectedPayment,
    invoicePreferences: { ...invoicePreferences },
  });

  setPaymentEdit(true);
};




const handelcancelpay = () => {
  if (!originalpaydata) return;

  setAccountholdername(originalpaydata.accountholdername);
  setAccountnumber(originalpaydata.accountnumber);
  setBankname(originalpaydata.bankname);
  setIfsccode(originalpaydata.ifsccode);
  setSelectedPayment(originalpaydata.selectedPayment);
  setInvoicePreferences({
    receiveByEmail: originalpaydata.invoicePreferences.receiveByEmail,
    monthlyConsolidated: originalpaydata.invoicePreferences.monthlyConsolidated,
    includePONumber: originalpaydata.invoicePreferences.includePONumber,
  });
  setPaymentEdit(false);
};

useEffect(() => {
  const storedData = localStorage.getItem("paymentSettings");
  if (storedData) {
    const parsed = JSON.parse(storedData);
    setAccountholdername(parsed.accountholdername || "");
    setAccountnumber(parsed.accountnumber || null);
    setBankname(parsed.bankname || "");
    setIfsccode(parsed.ifsccode || "");
    setSelectedPayment(parsed.selectedPayment || "bank");

    setInvoicePreferences({
      receiveByEmail: parsed.invoicePreferences?.receiveByEmail ?? true,
      monthlyConsolidated: parsed.invoicePreferences?.monthlyConsolidated ?? true,
      includePONumber: parsed.invoicePreferences?.includePONumber ?? true,
    });
  }
}, []);


  return (
    <>
     <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Payment Settings</h2>
             
              { !paymentEdit &&
              <Button onClick={() => enablepaymentEditMode()} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" /> Edit 
              </Button>

              }
            </div>
            
            <hr className="mb-6" />
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Account Details</h3>
            
           {/* Top row: Account Number & Re-enter Account Number */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  {/* Account Number */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Account Number
    </label>
    <Input
      type="text"
      inputMode="numeric"
      pattern="\d*"
      maxLength={18}
      value={firstAccountNumber}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "");
        setFirstAccountNumber(value);
      }}
      placeholder="Enter account number"
      className="w-full border-gray-400"
      disabled={!paymentEdit}
    />
  </div>

  {/* Re-enter Account Number */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Re-enter Account Number
    </label>
    <Input
      type="text"
      inputMode="numeric"
      pattern="\d*"
      maxLength={18}
      value={accountnumber}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "");
        setAccountnumber(value);
      }}
      placeholder="Re-enter account number to confirm"
      className={`w-full border-gray-400 ${
        accountnumber && accountnumber !== firstAccountNumber ? "border-red-500" : ""
      }`}
      disabled={!paymentEdit}
    />
    {accountnumber && accountnumber !== firstAccountNumber && (
      <p className="mt-1 text-sm text-red-600">Account numbers don't match</p>
    )}
  </div>
</div>

  {/* Spacer to balance grid if needed */}
  <div></div>


{/* Bottom row: 3 columns */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  {/* Account Holder Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Account Holder Name
    </label>
    <Input
      type="text"
      value={accountholdername}
      onChange={(e) => setAccountholdername(e.target.value)}
      placeholder="Steel Plant Ltd."
      className="w-full border-gray-400"
      disabled={!paymentEdit}
    />
  </div>

  {/* Bank Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Bank Name
    </label>
    <Input
      type="text"
      value={bankname}
      onChange={(e) => setBankname(e.target.value)}
      placeholder="HDFC Bank"
      className="w-full border-gray-400"
      disabled={!paymentEdit}
    />
  </div>

  {/* IFSC Code */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      IFSC Code
    </label>
    <Input
      type="text"
      value={ifsccode}
      onChange={(e) => {
        const upperValue = e.target.value.toUpperCase();
        const isValid = /^[A-Z0-9]*$/.test(upperValue);
        if (isValid) setIfsccode(upperValue);
      }}
      placeholder="HDFC0000123"
      maxLength={11}
      className="w-full border-gray-400"
      disabled={!paymentEdit}
    />
  </div>
</div>

            
           <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Payment Methods</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Bank Transfer */}
            <Card
              className={`p-4 cursor-pointer ${
                selectedPayment === "bank" ? "border-2 border-blue-500 bg-blue-50" : "border"
              }`}
              onClick={() => paymentEdit && setSelectedPayment("bank")}
            >
              <div className="flex items-center mb-2">
                <input type="radio" className="mr-2" checked={selectedPayment === "bank"}   disabled={!paymentEdit} readOnly />
                <h4 className="font-medium">Bank Transfer</h4>
              </div>
              <p className="text-sm text-gray-600">
                Direct bank transfer through NEFT/RTGS
              </p>
            </Card>

            {/* UPI Payment */}
           <Card
                className={`p-4 cursor-pointer ${
                  selectedPayment === "upi" ? "border-2 border-blue-500 bg-blue-50" : "border"
                }`}
                onClick={() => paymentEdit && setSelectedPayment("upi")}
              >
              <div className="flex items-center mb-2">
                <input type="radio" className="mr-2" checked={selectedPayment === "upi"}  disabled={!paymentEdit} readOnly />
                <h4 className="font-medium">UPI Payment</h4>
              </div>
              <p className="text-sm text-gray-600">
                Pay instantly using UPI ID
              </p>
            </Card>

            {/* Credit Card */}
            <Card
            className={`p-4 cursor-pointer ${
              selectedPayment === "card" ? "border-2 border-blue-500 bg-blue-50" : "border"
            }`}
            onClick={() => paymentEdit && setSelectedPayment("card")}
          >
              <div className="flex items-center mb-2">
                <input type="radio" className="mr-2" checked={selectedPayment === "card"}   disabled={!paymentEdit} readOnly />
                <h4 className="font-medium">Credit Card</h4>
              </div>
              <p className="text-sm text-gray-600">
                Visa, MasterCard, Rupay, etc.
              </p>
            </Card>
          </div>

            
           <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Invoice Preferences</h3>

          <div className="mb-6">
            {/* Receive invoices by email - Always checked and readonly */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2 accent-gray-400 cursor-default"
                checked={true}
                readOnly
              />
              <label className="text-sm font-medium text-gray-600">Receive invoices by email</label>
            </div>

            {/* Generate consolidated monthly invoice - Always checked and readonly */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2 accent-gray-400 cursor-default"               
                checked={true}
                readOnly
              />
              <label className="text-sm font-medium text-gray-600">Generate consolidated monthly invoice</label>
            </div>

            {/* Include PO number on invoices - Always checked and readonly */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-gray-400 cursor-default"    
            checked={true}
                readOnly
              />
              <label className="text-sm font-medium text-gray-600">Include PO number on invoices</label>
            </div>
          </div>
                          
                          <div className="flex justify-end gap-4 mt-8">
                            {paymentEdit && (
                              <>
                              <Button onClick={handlepaySaveChanges}>
                                  <Save className="w-4 h-4 mr-2" /> Save 
                                </Button>

                                <Button onClick={handelcancelpay} variant="outline">
                                <X className="w-4 h-4 mr-2" /> Cancel
                              </Button>
                                
                              </>
                            )}
                          </div>
    </>
  )

}
export default Payment;