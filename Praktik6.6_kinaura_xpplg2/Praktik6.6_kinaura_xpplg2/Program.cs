namespace Praktik6._6_kinaura_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int angka;

            // Blok 'do' akan dieksekusi minimal satu kali.
            do
            {
                Console.Write("Masukkan angka genap: ");
                // Mencoba membaca input dari pengguna
                if (!int.TryParse(Console.ReadLine(), out angka))
                {
                    Console.WriteLine("Input tidak valid. Silakan masukkan angka.");
                    // jika input tidak valid, set angka = 1 (ganjil) agar loop berlanjut
                    angka = 1;
                    continue; // lanjutkan ke iterasi berikutnya
                }
                // memeriksa apakah angka tersebut ganjil 
                if (angka % 2 != 0)
                {
                    Console.WriteLine($"Angka {angka} adalah ganjil. Coba lagi. ");
                }
                // kondisi diperiksa di akhir. Loop berlanjut selama angka ganjil.
            } while (angka % 2 != 0);
            Console.WriteLine($"Selamat! ANda memasukkan angka genap: {angka}");


        }
    }
}
