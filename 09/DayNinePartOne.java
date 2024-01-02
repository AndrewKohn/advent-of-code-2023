import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class DayNinePartOne {
    public static void main (String[] args) {
        String reportValues = "09/DayNineSampleData.txt";
//        String reportValues = "09/DayNineDataset.txt";
        ArrayList<Integer[]> data = getData(reportValues);

        System.out.println(data.size());
        for(int i = 0; i < data.size(); i++){
            System.out.println(Arrays.toString(data.get(i)));
        }
    }

    private static ArrayList<Integer[]> getData(String filePath){
        ArrayList<Integer[]> nums = new ArrayList<>();

        try(BufferedReader br = new BufferedReader(new FileReader(filePath))){
            String line;

            while((line = br.readLine()) != null){
                Integer[] arr = new Integer[line.split("\\s").length];

                for(int i = 0; i < line.split("\\s").length; i++){
                    arr[i] = Integer.parseInt(line.split("\\s")[i]);
                }

                nums.add(arr);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return nums;
    }

    private static void 
}
