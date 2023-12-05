import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

// Day 4 part 1

public class DayFourPartOne {
    public static void main(String[] args) {
        String scratchcards = "04/DayFourScratchcards.txt";

        System.out.println("Part One Result: " + getScratchcards(scratchcards));
    }

    private static int getScratchcards(String filePath){
        int points = 0;

        try(BufferedReader br = new BufferedReader(new FileReader(filePath))){
            String line;

            while((line = br.readLine()) != null){
                String[] leftSide = line.split(":\\s")[1].split("\\|")[0].split(" ");
                String[] rightSide = line.split(":\\s")[1].split("\\|")[1].split(" ");
                ArrayList<Integer> winningNumbers = new ArrayList<>();
                ArrayList<Integer> cardNumbers = new ArrayList<>();

                // Check left
                for (String s : leftSide) {
                    if (!s.isBlank()) winningNumbers.add(Integer.parseInt(s));
                }

                // Check right
                for (String s : rightSide) {
                    if (!s.isBlank()) cardNumbers.add(Integer.parseInt(s));
                }

                // sort
                Collections.sort(winningNumbers);
                Collections.sort(cardNumbers);

                points += evaluateCard(winningNumbers, cardNumbers);
            }
        }catch (IOException e){
            e.printStackTrace();
        }

        return points;
    }

    private static int evaluateCard(ArrayList<Integer> winningNumbers, ArrayList<Integer> cardNumbers){
        int result = 0;

        for (Integer winningNumber : winningNumbers) {
            for (Integer cardNumber : cardNumbers) {
                if (cardNumber.equals(winningNumber)) {
                    if (result == 0) result = 1;
                    else result *= 2;
                }
            }
        }

        return result;
    }
}
