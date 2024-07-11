use crate::{board::BloxelBoard, Pad};

pub struct Duster<const N: usize, const M: usize> {
    pad: Pad<N, M>,
}

impl<const N: usize, const M: usize> Duster<N, M> {
    pub fn erase(&self, board: &mut BloxelBoard, pos: (usize, usize)) {
        self.pad.activate(board, pos)
    }
}