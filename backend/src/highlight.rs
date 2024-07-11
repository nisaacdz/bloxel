use crate::{board::BloxelBoard, Pad};

pub struct Select<const N: usize, const M: usize> {
    pad: Pad<N, M>,
}

impl<const N: usize, const M: usize> Select<N, M> {
    pub fn new(pad: Pad<N, M>) -> Self {
        Self { pad }
    }

    pub fn highlight(&mut self, board: &mut BloxelBoard, pos: (usize, usize)) {
        self.pad.activate(board, pos)
    }

}