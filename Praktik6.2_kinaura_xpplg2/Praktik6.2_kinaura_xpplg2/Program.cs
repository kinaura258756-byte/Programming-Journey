namespace Praktik6._2_kinaura_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Variabel untuk perulangan hasil penjumlahan
            int total = 0;

            Console.WriteLine("Menghitung jumlah angka dari 1 sampai 5:");

            // Perualngan for dari 1 hingga 5
            for (int i = 1; i <= 5; i++)
            {
                // Tambahkan nilai i saat ini ke variabel total
                total = total + i; // Bisa juuga ditulis sebagai: total  += i;

                // Tampilkan proses penjumlahan d setiap langkah
                Console.WriteLine("Menambahkan " + i + ", total sementara = " + total);
            }

            // Tampilkan hasil akhir setelah perulangan selesai
            Console.WriteLine("\nHasil akhir penjumlahan adalah: " + total);
        }
    }
}
