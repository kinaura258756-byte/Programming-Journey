namespace Jumlah
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Input angka pertama dan kedua
            Console.Write("Masukkan angka pertama: ");
            int angka1 = int.Parse(Console.ReadLine());

            Console.Write("Masukkan angka kedua: ");
            int angka2 = int.Parse(Console.ReadLine());

            Console.WriteLine("\n--- Hasil Operasi Penjumlahan ---");

            // PENJUMLAHAN (+)
            Console.WriteLine($"{angka1} + {angka2} = {angka1 + angka2}");
            

        }
    }
}
