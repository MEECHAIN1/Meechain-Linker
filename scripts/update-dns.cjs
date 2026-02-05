import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// แปลง __dirname สำหรับ ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚠️ ใส่ API Key ของคุณที่นี่ หรือดึงจาก .env (แนะนำ)
const API_KEY = process.env.DNS_API_KEY || :"; 
const API_URL = "https://api.dnsexit.com/dns/lse.jsp";

async function updateDNS() {
  console.log("🔄 กำลังเริ่มกระบวนการอัปเดต DNS...");

  // 1. อ่านไฟล์ Payload
  const payloadPath = path.join(__dirname, '../dns-payload.cjs');

  if (!fs.existsSync(payloadPath)) {
    console.error("❌ ไม่พบไฟล์ dns-payload.json กรุณาสร้างไฟล์ก่อน");
    return;
  }

  const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  console.log(`📄 อ่านข้อมูลสำหรับโดเมน: ${payload.domain}`);

  // 2. สร้าง URL พร้อมพารามิเตอร์ (ตามคู่มือ)
  // รูปแบบ: https://api.dnsexit.com/dns/lse.jsp?apikey=KEY&domain=DOMAIN
  const targetUrl = `${API_URL}?apikey=${API_KEY}&domain=${payload.domain}`;

  try {
    // 3. ส่ง Request (POST)
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // 4. อ่านผลลัพธ์
    const result = await response.json();

    // ตรวจสอบผลลัพธ์ (Code 0 หรือ message Success)
    if (result.code === 0 || (result.message && result.message.toLowerCase().includes('success'))) {
      console.log("✅ อัปเดต DNS สำเร็จ!");
      console.log("📝 รายละเอียด:", result);
    } else {
      console.error("❌ เกิดข้อผิดพลาดจาก Server:");
      console.error(result);
    }

  } catch (error) {
    console.error("❌ เชื่อมต่อ API ล้มเหลว:", error.message);
  }
}

updateDNS();