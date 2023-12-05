import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Day 4 part 2

public class DayFourPartTwo {
    public static void main(String[] args) {
        Path scratchcards = Paths.get("04/DayFourScratchcards.txt");
        try{
            List<String> lines = Files.readAllLines(scratchcards);
            System.out.println("Part One Result: " + getExtraCards(lines));
        }catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static int getExtraCards(List<String> input) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < input.size(); i++) {
            map.put(i, 1);
        }

        for (int i = 0; i < input.size(); i++) {
            String inputLine = input.get(i);
            String[] splitLine = inputLine.split(":");
            String[] cardNumbers = splitLine[1].split("\\|");
            String[] winningNumbers = cardNumbers[0].trim().split("\\s+");
            String[] currNumbers = cardNumbers[1].trim().split("\\s+");
            List<Integer> st = new ArrayList<>();

            for (String currNum : currNumbers) {
                st.add(Integer.parseInt(currNum));
            }

            int count = 0;
            for (String winningNum : winningNumbers) {
                if (st.contains(Integer.parseInt(winningNum))) {
                    count++;
                }
            }

            for (int j = i + 1; j < i + count + 1; j++) {
                map.put(j, map.getOrDefault(j, 0) + map.getOrDefault(i, 0));
            }
        }
        int result = 0;
        for (int value : map.values()) {
            result += value;
        }

        return result;
    }
}