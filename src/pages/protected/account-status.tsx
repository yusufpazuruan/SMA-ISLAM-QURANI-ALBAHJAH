import InfoBanner from "@/components/ui/banner";
// import { Rocket, Sparkles, Zap, Flame, Laptop, Code } from "lucide-react"

export default function AccountStatus() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100 gap-6">
      <InfoBanner
        title="📢 Informasi Akun"
        description="Perhatian untuk status akun Anda"
        htmlBody="Status Akun Anda <strong>Belum Aktif</strong>, Silahkan hubungi Admin melalui <strong>WHATSAPP 62-821-9602-7366</strong> atau tunggu <strong>2x24 jam</strong>"
        type="info"
        animationSpeed="normal"
        width="70%"
        iconCount={30}
      />

      {/* <InfoBanner
        title="Peringatan Pembayaran"
        description="Tagihan Anda akan jatuh tempo"
        htmlBody="Pembayaran <strong>SPP</strong> akan jatuh tempo dalam <span style='color: yellow; font-weight: bold;'>3 hari</span>. Silahkan lakukan pembayaran segera."
        type="warning"
        width="90%"
        animationSpeed="fast"
      />

      <InfoBanner
        title="Pendaftaran Berhasil"
        description="Akun Anda telah terdaftar"
        htmlBody="<div style='text-align: center;'><strong>Selamat!</strong> Pendaftaran Anda telah berhasil. <br/><br/> Anda dapat mengakses semua fitur sekarang.</div>"
        type="success"
        height="180px"
        animationSpeed="very-fast"
      /> */}

      {/* <InfoBanner
        title="Kesalahan Login"
        description="Terjadi kesalahan saat login"
        htmlBody="<ul style='list-style-type: disc; margin-left: 20px;'><li>Username atau password yang Anda masukkan salah</li><li>Silahkan coba lagi atau hubungi administrator</li></ul>"
        type="error"
        width="95%"
        height="200px"
        animationSpeed="slow"
      />

      <InfoBanner
        title="Pengumuman Spesial"
        description="Fitur baru telah tersedia"
        htmlBody="Kami telah meluncurkan <span style='font-weight: bold; text-decoration: underline;'>fitur baru</span> yang dapat meningkatkan produktivitas Anda. <br/><br/> <button style='background-color: white; color: #0284c7; padding: 5px 10px; border-radius: 4px; font-weight: bold;'>Coba Sekarang!</button>"
        type="info"
        customIcons={[Rocket, Sparkles, Zap, Flame, Laptop, Code]}
        iconCount={15}
        width="85%"
        animationSpeed="normal"
      /> */}

      {/* <InfoBanner
        title="Informasi Akun"
        description="Perhatian untuk status akun Anda"
        htmlBody={`Silahkan hubungi Admin melalui <a href="https://wa.me/6282196027366" target="_blank" rel="noopener noreferrer" class="text-white font-bold hover:underline">WhatsApp</a> di nomor 62 821-9602-7366`}
        type="info"
        animationSpeed="normal"
        width="70%"
        iconCount={30}
      />

      <InfoBanner
        title="Peringatan Pembayaran"
        description="Tagihan Anda akan jatuh tempo"
        htmlBody="Pembayaran <strong>SPP</strong> akan jatuh tempo dalam <span style='color: yellow; font-weight: bold;'>3 hari</span>. Silahkan lakukan pembayaran segera melalui <Link to='https://payment.example.com' target='_blank'>link ini</Link>."
        type="warning"
        width="90%"
        animationSpeed="fast"
      />

      <InfoBanner
        title="Pendaftaran Berhasil"
        description="Akun Anda telah terdaftar"
        htmlBody="<div style='text-align: center;'><strong>Selamat!</strong> Pendaftaran Anda telah berhasil. <br/><br/> Anda dapat mengakses semua fitur sekarang di https://dashboard.example.com</div>"
        type="success"
        height="180px"
        animationSpeed="very-fast"
      />

      <InfoBanner
        title="Kesalahan Login"
        description="Terjadi kesalahan saat login"
        htmlBody="<ul style='list-style-type: disc; margin-left: 20px;'><li>Username atau password yang Anda masukkan salah</li><li>Silahkan coba lagi atau hubungi administrator</li></ul>"
        type="error"
        width="95%"
        height="200px"
        animationSpeed="slow"
      />

      <InfoBanner
        title="Pengumuman Spesial"
        description="Fitur baru telah tersedia"
        htmlBody="Kami telah meluncurkan <span style='font-weight: bold; text-decoration: underline;'>fitur baru</span> yang dapat meningkatkan produktivitas Anda. <br/><br/> <a href='#' style='display: inline-block; background-color: white; color: #0284c7; padding: 5px 10px; border-radius: 4px; font-weight: bold; text-decoration: none;'>Coba Sekarang!</a>"
        type="info"
        customIcons={[Rocket, Sparkles, Zap, Flame, Laptop, Code]}
        iconCount={15}
        width="85%"
        animationSpeed="normal"
      /> */}
    </main>
  );
}
