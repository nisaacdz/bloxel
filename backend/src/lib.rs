/// This module is thrash and is currently not being used in any way in the bloxel project
/// It was generated as part of the original designs but was abondoned in favor of the HTML canvas api
/// which is currently being used though react + javascript
///
/// In the future we might move computationally expensive operations to this module and call it at the frontend
/// `tauri` comands.

use board::BloxelBoard;

pub mod board;
pub mod chalk;
pub mod duster;
pub mod highlight;

pub struct Pad<const N: usize, const M: usize> {
    trace: [[[u8; 4]; M]; N],
}

impl<const N: usize, const M: usize> Pad<N, M> {
    pub const fn new(trace: [[[u8; 4]; M]; N]) -> Self {
        Self { trace }
    }

    pub const fn mid(&self) -> (usize, usize) {
        (N / 2, M / 2)
    }

    pub fn activate(&self, board: &mut BloxelBoard, pos: (usize, usize)) {
        let (x, y) = pos;
        let (midx, midy) = self.mid();
        for tj in 0..N {
            for ti in 0..M {
                let [r1, g1, b1, a1] = self.trace[tj][ti];
                let ni = x as isize + ti as isize - midx as isize;
                let nj = y as isize + tj as isize - midy as isize;

                if ni >= 0 && ni <= board.width() as isize && nj >= 0 && nj <= board.height() as isize {
                    let ni = ni as usize;
                    let nj = nj as usize;
                    let [r2, g2, b2] = *board.idx(ni, nj);
                    let f1 = a1 as f32 / 255f32;
                    let f2 = 1f32 - f1;
                    let r = f1 * r1 as f32 + f2 * r2 as f32;
                    let g = f1 * g1 as f32 + f2 * g2 as f32;
                    let b = f1 * b1 as f32 + f2 * b2 as f32;
                    *board.idx_mut(ni, nj) = [r as u8, g as u8, b as u8]
                }
            }
        }
    }
}
