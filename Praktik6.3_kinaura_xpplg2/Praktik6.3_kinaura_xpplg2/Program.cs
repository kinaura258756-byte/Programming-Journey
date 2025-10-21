namespace Praktik6._3_kinaura_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Inisialisasi variabel untuk menyimpan input
            string inputUser = "";

            Console.WriteLine("Program akan terus berjalan hingga Anda mengetik 'keluar'.");

            // Perulangan selama isi variabel inputUser TIDAK SAMA DENGAN "keluar"
            while (inputUser.ToLower() != "keluar")
            {
                Console.WriteLine("\nKetik sesuatu (atau 'keluar' untuk berhenti): ");
                inputUser = Console.ReadLine(); // Baca input dari user

                Console.WriteLine("Anda mengetik: " + inputUser);
            }
            Console.WriteLine("\nProgram selesai. Thanks");

        }
    }
}
