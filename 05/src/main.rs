// Day 5
// Food Production
//  List all the seeds needed to be planted
//  Almanac contains a list of maps that shows ranges of numbers that can be converted.
//  Destination range start | source range start | range length

use std::{path::Path, fs::File, io::Read};


fn main() {
    let file_path = Path::new("./day5_almanac_sample.txt");
    // let file_path = Path::new("./day5_almanac.txt");
    println!("Part 1: {}", part_one(file_path));
    // println!("Part 2: {}", part_two(file_path));
}

fn part_one(file_path: &Path) -> i32 {
    let mut contents = String::new();

    let mut file = File::open(file_path).expect("Error opening txt file...");
    file.read_to_string(&mut contents).expect("Error reading txt file...");

    // Split file into block categories
    let almanac: Vec<&str> = contents.split("\n\n")
        .flat_map(|block| 
            block.split(":")
            .last()
            .map(str::trim))
            .collect();

    for (index, lines) in almanac.iter().enumerate(){
        let mut blocks: Vec<Vec<i64>> = Vec::new();
        println!("{}:", index);
        for line in lines.lines(){
            let nums: Vec<i64> = line.split_whitespace()            
                .map(|num| num.parse::<i64>()
                .unwrap())
                .collect();

            blocks.push(nums);
        }
        println!("{:#?}", blocks);
    }

    // TODO: loop seeds to find destinations.

    return 0;
}

// fn part_two(file_path: &Path) -> i32 {

//     return 0;
// }