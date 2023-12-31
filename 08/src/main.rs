// Day 8
// Haunted Wasteland
//  Follow the map of nodes in order to get out.
//      AAA = Start
//      ZZZ = End
//      Instructions can be repeated from the start as long as the steps reach
//      the end.

use std::{fs::File, io::Read, path::Path};

fn main() {
    let file_path = Path::new("./day8_map.txt");
    println!("{:?}", part_one(file_path));
}

fn part_one(file_path: &Path) -> Vec<&str> {
    let data: Vec<Vec<String>> = get_data(file_path);
    println!("{:?}", &data[0]);
    for (i, instructions) in data[1].iter().enumerate() {
        // println!("{i} : {instructions:?}");
    }
    
    let steps: Vec<&str> = data[0].iter().map(|s| s.as_ref()).collect();


    return steps;
}

fn get_data(file_path: &Path) -> Vec<Vec<String>> {
    let mut contents = String::new();

    let mut file = File::open(file_path).expect("Error opening txt file...");
    file.read_to_string(&mut contents).expect("Error reading txt file...");
    let lines: Vec<&str> = contents.lines().collect();
    let mut instructions: Vec<String> = Vec::new();

    let mut y:usize = 0;
    while y < lines.len() {
        let line: &str = lines[y];
        if line.contains("=") {
            instructions.push(line.to_string());
        }
        y += 1;
    }

    let data: Vec<Vec<String>> = vec![
        vec![lines[0].to_string()],
        instructions
    ];

    return data;
}
