fn main() {
    // Point to the folder containing your static library
    println!("cargo:rustc-link-search=native=libs");

    // Link the static library
    println!("cargo:rustc-link-lib=static=c_statics");
}
