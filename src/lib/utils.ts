import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateUsername(fullnameOrEmail: string): string {
  // Jika mengandung "@", artinya email → ambil hanya bagian sebelum "@"
  const namePart = fullnameOrEmail.includes("@")
    ? fullnameOrEmail.split("@")[0]
    : fullnameOrEmail;

  const base = namePart
    .toLowerCase()
    .normalize("NFD")                    // Hilangkan aksen
    .replace(/[\u0300-\u036f]/g, "")     // Hilangkan unicode di atas huruf
    .replace(/[^a-z0-9]/g, "")           // Hanya huruf & angka
    .slice(0, 15);                       // Batasi panjang

  const randomDigits = Math.floor(100 + Math.random() * 900); // 3 digit angka
  return `${base}${randomDigits}`;
}



// const fullname = "YusufPazuruan@gmail.com";
// const username = generateUsername(fullname);
// console.log(username); // Output: yusufpasuruan123
