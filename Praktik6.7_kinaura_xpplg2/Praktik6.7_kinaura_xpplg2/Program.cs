namespace Praktik6._7_kinaura_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int pilihan;

            do
            {
                // tampilkan menu
                Console.WriteLine("\n=== Menu Aplikasi ===");
                Console.WriteLine("1. Lihat Data");
                Console.WriteLine("2. Tambah Data");
                Console.WriteLine("3. Keluar");

                // Baca input pengguna
                if (!int.TryParse(Console.ReadLine(), out pilihan))
                {
                    Console.WriteLine("Pilihan tidak valid. Harap masukkan angka 1, 2, atau 3.");
                    // tetapkan nilai selain 3 agar loop berlanjut
                    pilihan = 0;
                    continue;
                }
                // proses pilihan
                switch (pilihan)
                {
                    case 1:
                        Console.WriteLine("Anda memilih: Lihat Data.");
                        break;
                    case 2:
                        Console.WriteLine("Anda memilih: Tambah Data.");
                        break;
                    case 3:
                        Console.WriteLine("Program akan berhenti...");
                        break; // keluar dari switch
                    default:
                        Console.WriteLine("Pilihan di luar jangkauan. Harap masukkan 1, 2, atau 3.");
                        break;
                }
                // Kondisi loop: lanjutkan selama pilihan BUKAN 3.
            } while (pilihan != 3);
              Console.WriteLine("Terima asih telah menggunakan aplikasi.");
        }
    }
}
