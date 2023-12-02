import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

/*
    Day 2 - part 2
    Cube Conundrum
        Find the fewest number of cubes in each color that could have made the game possible.
        Multiply the together and return the sum from all the games.
 */

public class DayTwoPartTwo {
    public static void main(String[] args) {
        String gameData = "02/DayTwoGameResults.txt";
        int result = 0;

        try(BufferedReader br = new BufferedReader(new FileReader(gameData))){
            String line;
            while((line = br.readLine()) != null){
                String[] rounds = line.split(":\\s")[1].split(";\\s");
                int blueMax = 0;
                int greenMax = 0;
                int redMax = 0;

                for (String round : rounds) {
                    String[] cubes = round.split(",\\s");

                    for (String cube : cubes) {
                        int value = Integer.parseInt(cube.split("\\s")[0]);
                        if (cube.contains("blue") && value > blueMax) blueMax = value;
                        if (cube.contains("green") && value > greenMax) greenMax = value;
                        if (cube.contains("red") && value > redMax) redMax = value;
                    }
                }

                result += (blueMax * greenMax * redMax);
            }
        }catch (IOException e){
            e.printStackTrace();
        }

        System.out.println(result);
    }
}