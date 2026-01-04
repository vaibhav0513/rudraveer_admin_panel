import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaPlus, FaDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";

const Donations = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({
    donorName: "",
    contact: "",
    donationType: "money",
    amount: "",
    item: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const invoiceRef = useRef();

  const ngoInfo = {
    name: "RudraVeer Pratishtan",
    regNumber: "MH/362/2020",
    email: "rudraveerpratishthan8055@gmail.com",
    address: "Kapurbawdi Naka, Thane, Maharashtra - 400606",
    logoUrl: "/logo.jpg",
    founder: "Shubham Gadge",
  };

  const fetchDonations = async () => {
    try {
      const res = await axios.get(`${baseURL}/donations`);
      setDonations(res.data);
    } catch (err) {
      console.error("Failed to fetch donations:", err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        donorName: form.donorName,
        contact: form.contact,
        donationType: form.donationType,
      };

      if (form.donationType === "money") payload.amount = form.amount;
      else payload.item = form.item;

      await axios.post(`${baseURL}/donations`, payload);
      setForm({
        donorName: "",
        contact: "",
        donationType: "money",
        amount: "",
        item: "",
      });
      fetchDonations();
      setModalOpen(false);
    } catch (err) {
      console.error("Donation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const element = invoiceRef.current;
    html2pdf().from(element).save(`Invoice_${selectedDonation._id}.pdf`);
  };

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Donor & Donation Management
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-md shadow hover:opacity-90"
        >
          <FaPlus /> Add Donation
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">All Donations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2">Sr No</th>
                <th className="px-4 py-2">Donor Name</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount/Item</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d, index) => (
                <tr key={d._id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {d.donorName}
                  </td>
                  <td className="px-4 py-2">{d.contact}</td>
                  <td className="px-4 py-2 capitalize">{d.donationType}</td>
                  <td className="px-4 py-2">
                    {d.donationType === "money" ? `₹${d.amount}` : d.item}
                  </td>
                  <td className="px-4 py-2">
                    {d.createdAt
                      ? new Date(d.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedDonation(d);
                        setShowInvoice(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded"
                    >
                      Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Add Donation
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Donor Name"
                value={form.donorName}
                onChange={(e) =>
                  setForm({ ...form, donorName: e.target.value })
                }
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="text"
                placeholder="Contact"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <select
                value={form.donationType}
                onChange={(e) =>
                  setForm({ ...form, donationType: e.target.value })
                }
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="money">Money</option>
                <option value="goods">Goods</option>
              </select>

              {form.donationType === "money" ? (
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              ) : (
                <input
                  type="text"
                  placeholder="Item Donated"
                  value={form.item}
                  onChange={(e) => setForm({ ...form, item: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF5E3A] text-white font-medium py-2 rounded-md hover:bg-[#e14f2e]  transition"
              >
                {loading ? "Submitting..." : "Submit Donation"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showInvoice && selectedDonation && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full relative">
            <button
              onClick={() => setShowInvoice(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>

            <div ref={invoiceRef} className="px-1">
              <div className="flex items-center gap-4 border-b pb-4 mb-4">
                <img
                  src={ngoInfo.logoUrl}
                  alt="Logo"
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {ngoInfo.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Reg No: {ngoInfo.regNumber}
                  </p>
                  <p className="text-sm text-gray-600">{ngoInfo.email}</p>
                  <p className="text-sm text-gray-600">{ngoInfo.address}</p>
                </div>
              </div>

              <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
                Donation Receipt
              </h2>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Receipt ID:</strong> {selectedDonation._id}
                </p>
                <p>
                  <strong>Serial No:</strong> RV-
                  {selectedDonation._id.slice(-6).toUpperCase()}
                </p>
                <p>
                  <strong>Donor Name:</strong> {selectedDonation.donorName}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedDonation.contact}
                </p>
                <p>
                  <strong>Donation Type:</strong>{" "}
                  {selectedDonation.donationType}
                </p>
                {selectedDonation.donationType === "money" && (
                  <p>
                    <strong>Amount:</strong> ₹{selectedDonation.amount}
                  </p>
                )}
                {selectedDonation.donationType === "goods" && (
                  <p>
                    <strong>Items Donated:</strong> {selectedDonation.item}
                  </p>
                )}
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedDonation.createdAt).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
                <p>
                  <strong>Received By:</strong> {ngoInfo.founder}
                </p>
              </div>

              <div className="mt-6 text-right text-sm">
                <p className="font-semibold">Authorized Signature</p>
                <p>{ngoInfo.founder}</p>
                <p className="text-xs text-gray-500">Founder, {ngoInfo.name}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={downloadPDF}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white px-6 py-2 rounded-md font-medium shadow-md flex items-center gap-2"
              >
                <FaDownload /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;
