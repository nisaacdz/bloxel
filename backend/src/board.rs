pub struct BloxelBoard {
    board: Vec<Vec<[u8; 3]>>,
}

impl BloxelBoard {
    pub fn new(background: [u8; 3], width: usize, height: usize) -> Self {
        assert!(width > 0 && height > 0);
        Self { board: vec![vec![background; width]; height] }
    }

    pub fn width(&self) -> usize {
        self.board.len()
    }

    pub fn height(&self) -> usize {
        self.board[0].len()
    }

    pub fn idx(&self, x: usize, y: usize) -> &[u8; 3] {
        &self.board[x][y]
    }

    pub fn idx_mut(&mut self, x: usize, y: usize) -> &mut [u8; 3] {
        &mut self.board[x][y]
    }
    
}

