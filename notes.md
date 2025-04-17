# TUGAS

1. login / signup dengan email dan password
✅ signup dengan email & password
✅ mengirim konfirmasi email ke user 
✅ konfirmasi berhasil dan redirect ke /create-new-user
✅ data berhasil di simpan di postgres neondb
✅ setelah signup redirect ke /onboarding untuk melengkapi data user
✅ mengupdate data user untuk pertama kali di /onboarding
✅ login dengan email & password
✅ setelah login redirect ke /dashboard
✅ logout

2. login / signup dengan social auth GOOGLE
✅ signup dengan social auth GOOGLE
✅ redirect ke /create-new-user?type=signup
✅ data berhasil di simpan di postgres neondb
✅ setelah signup redirect ke /onboarding untuk melengkapi data user
✅ mengupdate data user untuk pertama kali di /onboarding
✅ login dengan social auth GOOGLE
✅ setelah login redirect ke /dashboard
✅ logout

3. check unique email
✅ check unique email
✅ jika email sudah ada -> redirect ke /login
✅ jika email belum ada -> redirect ke /create-new-user

4. ✅ password tidak boleh sama dengan email

5. ✅ jika sudah login maka tidak bisa mengarah ke auth routes ( /login, /signup dll)

6. onboarding
✅ fungsi pengecekan data user lengkap ada di protected layout
✅ jika user belum melengkapi data maka redirect ke /onboarding

