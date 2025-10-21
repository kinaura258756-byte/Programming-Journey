namespace contoh_perulngan_for
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Perulangan untuk menampilkan angka 1 sampai 10");

            // Perulanhan for dimulai di sini
            for (int i = 1; i <= 10; i++)
            {
                // Blok kode yang akan diulang
                Console.WriteLine("Angka ke-" + i);
            }

            Console.WriteLine("\nPerulangan selesai.");
        }
    }
}
