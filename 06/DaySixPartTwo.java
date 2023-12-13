import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

// Day six part 2

public class DaySixPartTwo {
    public static void main(String[] args) {
//        String filePath = "06/SampleRaces.txt";
        String filePath = "06/DaySixRaces.txt";
        ArrayList<Long> raceData = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;

            while ((line = br.readLine()) != null) {
                long num = Long.parseLong(line.split(":")[1].replaceAll("\\s", ""));

                raceData.add(num);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        int numOfWaysToWin = 0;
        for (int currentSecond = 0; currentSecond < raceData.get(0); currentSecond++) {
            long time = raceData.get(0);
            long recordDistance = raceData.get(1);

            if ((time - currentSecond) * currentSecond > recordDistance) {
                numOfWaysToWin++;
            }
        }

        System.out.println(numOfWaysToWin);
    }
}