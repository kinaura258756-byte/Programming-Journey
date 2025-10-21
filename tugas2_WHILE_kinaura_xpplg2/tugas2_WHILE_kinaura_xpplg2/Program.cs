namespace tugas2_WHILE_kinaura_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Variabel untuk perulangan hasil penjumlahan
            int total = 0;
            int i = 1;

            Console.WriteLine("Menghitung jumlah total dari bilangan 1 sampai 5:");

            while (i <= 5)  // Loop while berjalan selama i kurang dari atau sama dengan 5
            {
                total += i;  // Tambahkan nilai i ke total
                i++;       // Increment i untuk melanjutkan loop
            }
            // Menampilkan hasil akhir
            Console.WriteLine("Total : " + total);
        }
    }
}
