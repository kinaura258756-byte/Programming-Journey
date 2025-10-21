namespace Tugas3_KonversiSuhu_kinaura_xpplg2
{
    internal class Program
    {
        // Fungsi KonversiSuhu: mengubah Celcius ke Fahrenheit
        static double KonversiSuhu(double celsius)
        {
            double fahrenheit = (celsius * 9 / 5) + 32;
            return fahrenheit;
        }

        static void Main(string[] args)
        {
            Console.Write("Masukkan suhu dalam Celcius: ");
            double c = double.Parse(Console.ReadLine());

            // Panggil fungsi KonversiSuhu
            double hasilKonversi = KonversiSuhu(c);

            Console.WriteLine($"Suhu {c}°C = {hasilKonversi}°F");
        }
    }
}
