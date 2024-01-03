import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class DayNinePartOne {
    public static void main (String[] args) {
        long startTime = System.currentTimeMillis();
//        String reportValues = "09/DayNineSampleData.txt";
        String reportValues = "09/DayNineDataset.txt";
        List<List<int[]>> histories = getData(reportValues);

        int sumNext = 0;
        int sumPrev = 0;
        for(List<int[]> history : histories){
            sumNext += getNextValue(history);   // Get right side values
            sumPrev += getPrevValue(history);   // Get left side values
        }

        long runTime = System.currentTimeMillis() - startTime;
        System.out.println("Run Time: " + runTime + "ms");
        System.out.println("Part one: " + sumNext);
        System.out.println("Part two: " + sumPrev);
    }

    private static List<List<int[]>> getData(String filePath){
        List<List<int[]>> histories = new ArrayList<>();
        try(BufferedReader br = new BufferedReader(new FileReader(filePath))){
            String line;

            while((line = br.readLine()) != null){
                int len = line.split("\\s").length;
                int[] arr = new int[len];

                for(int i = 0; i < len; i++){
                    arr[i] = Integer.parseInt(line.split("\\s")[i]);
                }

                histories.add(getHistory(arr));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return histories;
    }

    private static List<int[]> getHistory(int[] line) {
        List<int[]> history = new ArrayList<>();
        int[] current = line;

        history.add(line);

        while (true) {
            int[] next = new int[current.length - 1];
            for (int i = 0; i < current.length - 1; i++) {
                next[i] = current[i + 1] - current[i];
            }

            history.add(next);

            boolean hasNonZero = Arrays.stream(next).anyMatch(x -> x != 0);
            if (hasNonZero) {
                current = next;
            } else {
                break;
            }
        }

        return history;
    }

    private static int getNextValue(List<int[]> history) {
        List<int[]> updatedHistory = new ArrayList<>(history);

        Collections.reverse(updatedHistory);

        for (int i = 1; i < updatedHistory.size(); i++) {
            int[] currentArray = updatedHistory.get(i);
            int[] prevArray = updatedHistory.get(i - 1);

            int sum = prevArray[prevArray.length - 1] 
                + currentArray[currentArray.length - 1];
            int[] newArray = 
                Arrays.copyOf(currentArray, currentArray.length + 1);
            newArray[currentArray.length] = sum;

            updatedHistory.set(i, newArray);
        }

        return updatedHistory.getLast()[updatedHistory.getLast().length - 1];
    }

    private static int getPrevValue(List<int[]> history) {
        List<int[]> updatedHistory = new ArrayList<>(history);

        Collections.reverse(updatedHistory);

        for (int i = 0; i < updatedHistory.size() - 1; i++) {
            int sum = updatedHistory.get(i + 1)[0] - updatedHistory.get(i)[0];
            updatedHistory.get(i + 1)[0] = sum;
        }

        return updatedHistory.getLast()[0];
    }
}
