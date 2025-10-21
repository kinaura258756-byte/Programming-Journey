namespace tugas1_FOR_kinaura_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            
            // Menampilkan judul
            Console.WriteLine("Tabel Perkalian 5:");
            // Loop for dari 1 hingga 10
            for (int i = 1; i <= 10; i++)
            {
                int hasil = 5 * i;  // Menghitung hasil perkalian
                Console.WriteLine($"5 x {i} = {hasil}");  // Mencetak hasil

            }
        }
    }
}
