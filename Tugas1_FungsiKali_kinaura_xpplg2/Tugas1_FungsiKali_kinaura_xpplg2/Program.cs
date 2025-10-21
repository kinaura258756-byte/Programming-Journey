namespace Tugas1_FungsiKali_kinaura_xpplg2
{
    internal class Program
    {
        // Fungsi Kali yang menerima tiga bilangan integer dan menampilkan hasil perkaliannya
        static void Kali(int a, int b, int c)
        {
            Console.WriteLine($"Hasil perkalian {a} * {b} * {c} = {a * b * c}");
        }
        static void Main(string[] args)
        {
            // Contoh pemanggilan fungsi dengan nilai 2, 3, dan 4
            Kali(2, 3, 4);

        }
    }
}
