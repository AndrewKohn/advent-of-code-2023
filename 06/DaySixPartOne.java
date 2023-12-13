import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

// Day six part 1

public class DaySixPartOne {
    public static void main(String[] args) {
//        String filePath = "06/SampleRaces.txt";
        String filePath = "06/DaySixRaces.txt";
        ArrayList<int[]> raceData = new ArrayList<>();
        ArrayList<Integer> numsOfWaysToWin = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;

            while ((line = br.readLine()) != null) {
                String[] str = line.split(":")[1].trim().split("\\s+");
                raceData.add(Arrays.stream(str).mapToInt(Integer::parseInt).toArray());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        for (int i = 0; i < raceData.get(0).length; i++) {
            int time = raceData.get(0)[i];
            int recordDistance = raceData.get(1)[i];
            int numOfWaysToWin = 0;

            for (int currentSecond = 1; currentSecond <= time; currentSecond++) {
                if ((time - currentSecond) * currentSecond > recordDistance) {
                    numOfWaysToWin++;
                }
            }
            numsOfWaysToWin.add(numOfWaysToWin);
        }

        int result = 1;
        for (int wins : numsOfWaysToWin) {
            result *= wins;
        }

        System.out.println(result);
    }
}