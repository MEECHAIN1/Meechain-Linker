// --- MeeChain Ritual API Layer (Node.js + Express) ---
// ส่วนนี้ใช้สำหรับเป็น Middleware เชื่อมต่อ Smart Contract กับ Frontend
import express from "express";
import { ethers } from "ethers";
import cors from "cors";

const app = express();

// อนุญาตให้ Frontend เข้าถึง API ได้จากทุกที่
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// RPC ของ MeeChain Ritual (ChainID: 13390)
// ใช้ URL ที่เสถียรที่สุดสำหรับระบบ
const RPC_URL = "https://rpc.meechain.run.place"; 
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Contract Addresses (อ้างอิงตามที่คุณระบุมา)
const FUSION_LAB = "0x8da6eb1cd5c0c8cf84bd522ab7c11747db1128c9";
const MCB_TOKEN = "0x45b6c114287f465597262d7981c4d29914a2a579";

// ------------------- API Routes -------------------

// 1. ดึงข้อมูลสุขภาพของเครือข่าย (Network Metrics)
app.get("/network", async (req, res) => {
  try {
    const block = await provider.getBlock("latest");
    const network = await provider.getNetwork();

    res.json({
      success: true,
      chainId: Number(network.chainId),
      blockHeight: block.number,
      timestamp: block.timestamp,
      gasPrice: "1.5 Gwei" // ค่าสมมติสำหรับการทดสอบบน Ritual
    });
  } catch (e) { 
    res.status(500).json({ success: false, error: e.message }); 
  }
});

// 2. ตรวจสอบยอดเงินคงเหลือ (MCB Balance)
app.get("/balance/:address", async (req, res) => {
  try {
    const { address } = req.params;
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ success: false, error: "Invalid wallet address" });
    }

    const balance = await provider.getBalance(address);
    res.json({ 
      success: true,
      address, 
      balance: ethers.formatEther(balance),
      currency: "MCB"
    });
  } catch (e) { 
    res.status(500).json({ success: false, error: e.message }); 
  }
});

// 3. ตรวจสอบสถานะ Node
app.get("/health", (req, res) => {
  res.json({ status: "online", service: "MeeChain API Layer", timestamp: Date.now() });
});

// --------------------------------------------------

app.listen(PORT, () => {
  console.log(`Ⓜ️ MeeChain Ritual API is active`);
  console.log(`🔗 Endpoint: http://localhost:${PORT}`);
});