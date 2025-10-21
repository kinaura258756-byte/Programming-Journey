namespace Praktik6._5_kinaura_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // 1. Inisialisasi variabel penghitung (counter)
            int angka = 1;

            Console.WriteLine("Menampikan angka 1 sampai 20: ");

            // 2. Blok 'do-while'
            do
            {
                // tampilkan nilai variabel 'angka' saat ini
                Console.WriteLine(angka);

                // tambahkan nilai 'angka' sebanyak 1 (increment)
                angka++;

                // uji kondisi: loop berlanjut selama 'angka' kurang dari atau sama dengan 

            } while (angka <= 20);
            Console.WriteLine("Selesai.");
        }
    }
}
