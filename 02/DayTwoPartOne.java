import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

/*
    Day 2 - part 1
    Cube Conundrum
        Limit to 12 red, 13 green, and 14 blue cubes
        Try to find amount of games possible w/ above limitations.
        Find the sum of all game ID's (e.g. games 1, 2, 5 are possible, so sum = 8)
 */

public class DayTwoPartOne {
    static final int BLUE_LIMIT = 14;
    static final int GREEN_LIMIT = 13;
    static final int RED_LIMIT = 12;

    public static void main(String[] args) {
        String gameData = "02/DayTwoGameResults.txt";
        int lineCount = 1;
        int result = 0;

        try(BufferedReader br = new BufferedReader(new FileReader(gameData))){
            String line;
            while((line = br.readLine()) != null){
                String[] rounds = line.split(":\\s")[1].split(";\\s");
                boolean isPossible = true;

                for (String round : rounds) {
                    String[] cubes = round.split(",\\s");

                    for (String cube : cubes) {
                        int value = Integer.parseInt(cube.split("\\s")[0]);
                        if (cube.contains("blue") && value > BLUE_LIMIT) isPossible = false;
                        if (cube.contains("green") && value > GREEN_LIMIT) isPossible = false;
                        if (cube.contains("red") && value > RED_LIMIT) isPossible = false;
                    }
                }

                if(isPossible) {
                    result += lineCount;
                }

                lineCount++;
            }
        }catch (IOException e){
            e.printStackTrace();
        }

        System.out.println(result);
    }
}