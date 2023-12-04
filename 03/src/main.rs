// Day 3
// Gear Ratios
//  The engine schematic is a visual representation of the engine.
//      Any number touching a symbol = part number.
//      Return the sum of all part numbers.
//      Diagonally-touching numbers are part numbers too.

use std::{fs::File, io::Read, path::Path};

use regex::Regex;

fn main() {
    // let file_path = Path::new("./bla.txt");
    let file_path = Path::new("./day3_engine_schematic.txt");
    println!("Part 1: {}", part_one(file_path));
    println!("Part 2: {}", part_two(file_path));
}

fn part_one(file_path: &Path) -> i32 {
    let mut contents = String::new();
    let mut results: i32 = 0;
    let regex_pattern = Regex::new(r"[!@#$%^&*-+=./]").unwrap();

    let mut file = File::open(file_path).expect("Error opening txt file...");
    file.read_to_string(&mut contents).expect("Error reading txt file...");

    let lines: Vec<&str> = contents.lines().collect();
    let mut y: usize = 0;

    while y < lines.len() {
        let line: Vec<char> = lines[y].chars().collect();
        let mut x: usize = 0;

        print!("{}  |   ", y);
        while x < line.len(){
            if line[x] == '*' {
                // Check upwards
                let previous_line: Vec<char> = lines[y - 1].chars().collect();
                let previous_line_string: String = previous_line.iter().collect();
                
                
                if !regex_pattern.is_match(&previous_line_string[x - 1..=x]) || 
                !regex_pattern.is_match(&previous_line_string[x..x]) || 
                !regex_pattern.is_match(&previous_line_string[x..=x + 1]){
                // if previous_line[x - 1] != '.' || previous_line[x] != '.' || previous_line[x + 1] != '.' {
                    let pivot = previous_line[x];
                    let mut right_index: usize = x + 1;
                    let mut right_values = vec![];
                    let mut left_index: isize = (x - 1) as isize;
                    let mut left_values = vec![];

                    while right_index < previous_line.len() && previous_line[right_index] != '.'
                    {
                        right_values.push(previous_line[right_index]);
                        right_index += 1;
                    }

                    while left_index >= 0 && previous_line[left_index as usize] != '.'
                    {
                        left_values.insert(0, previous_line[left_index as usize]);
                        left_index -= 1;
                    }                    

                    if !regex_pattern.is_match(&pivot.to_string()) {
                        let mut upper_results: Vec<char> = Vec::new();
                        upper_results.extend(left_values.iter());
                        upper_results.push(pivot);
                        upper_results.extend(right_values.iter());

                        let upper_result: String = upper_results.iter().collect();
                        let number: i32 = upper_result.parse().unwrap();
                        results += number;
                    } else {
                        if left_values.len() > 0 {
                            let left_result: String = left_values.iter().collect();
                            let number: i32 = left_result.parse().unwrap();
                            results += number;
                        }
                        
                        if right_values.len() > 0 {
                            let right_result: String = right_values.iter().collect();
                            let number: i32 = right_result.parse().unwrap();
                            results += number;
                        }
                    }
                }                
                
                // Check left
                if let Some(left_character) = line.get(x - 1) {
                    if !regex_pattern.is_match(&left_character.to_string()) {
                        let left_result: String = get_left_numbers(x, &line).iter().collect();
                        let number: i32 = left_result.parse().unwrap();
                        results += number;
                    }
                }

                // Check right
                if let Some(right_character) = line.get(x - 1) {
                    if !regex_pattern.is_match(&right_character.to_string()) {
                        let right_result: String = get_right_numbers(x, &line).iter().collect();
                        if right_result.len() > 0 {
                            let number: i32 = right_result.parse().unwrap();
                            results += number;
                        }
                    }
                }

                // Check downwards
                let next_line: Vec<char> = lines[y + 1].chars().collect();
                let next_line_string: String = next_line.iter().collect();

                if !regex_pattern.is_match(&next_line_string[x - 1..=x]) || 
                !regex_pattern.is_match(&next_line_string[x..x]) || 
                !regex_pattern.is_match(&next_line_string[x..=x + 1]){
                // if next_line[x - 1] != '.' || next_line[x] != '.' || next_line[x + 1] != '.' {
                    let pivot = next_line[x];
                    let mut right_index: usize = x + 1;
                    let mut right_values = vec![];
                    let mut left_index: isize = (x - 1) as isize;
                    let mut left_values = vec![];

                    while right_index < next_line.len() && next_line[right_index] != '.'
                    {
                        right_values.push(next_line[right_index]);
                        right_index += 1;
                    }

                    while left_index >= 0 && next_line[left_index as usize] != '.'
                    {
                        left_values.insert(0, next_line[left_index as usize]);
                        left_index -= 1;
                    }                    

                    if !regex_pattern.is_match(&pivot.to_string()) {
                        let mut lower_results: Vec<char> = Vec::new();
                        lower_results.extend(left_values.iter());
                        lower_results.push(pivot);
                        lower_results.extend(right_values.iter());

                        let lower_result: String = lower_results.iter().collect();
                        let number: i32 = lower_result.parse().unwrap();
                        results += number;
                    } else {
                        if left_values.len() > 0 {
                            let left_result: String = left_values.iter().collect();
                            let number: i32 = left_result.parse().unwrap();
                            results += number;
                        }
                        
                        if right_values.len() > 0 {
                            let right_result: String = right_values.iter().collect();
                            let number: i32 = right_result.parse().unwrap();
                            results += number;
                        }
                    }
                }               
            }
            x += 1;
        }

        println!();

        y += 1;
    }
    

    return results;
}

fn part_two(_file_path: &Path) -> i32{
    return 0;
}

fn get_left_numbers(x: usize, line: &Vec<char>) -> Vec<char>{
    let mut num: Vec<char> = Vec::new();
    let mut result: Vec<char> = Vec::new();
    let mut left_index: isize = (x - 1) as isize;
    
    while left_index >= 0 && line[left_index as usize] != '.' {
        num.push(line[left_index as usize]);
        left_index -= 1;
    }

    for n in num.iter().rev() {
        result.push(*n);
    }

    return result;
}

fn get_right_numbers(x: usize, line: &Vec<char>) -> Vec<char>{
    let mut num: Vec<char> = Vec::new();
    let mut right_index: isize = (x + 1) as isize;
    
    if x + 1 < line.len() {
        return num;
    }

    while right_index >= 0 && line[right_index as usize] != '.' {
        num.push(line[right_index as usize]);
        right_index += 1;
    }

    return num;
}

