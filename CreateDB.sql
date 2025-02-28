use tasktable

CREATE TABLE tasktable (
  id INT PRIMARY KEY AUTO_INCREMENT,           
  title VARCHAR(255) NOT NULL,              
  description TEXT,                      
  status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending', 
  due_date DATETIME,                    
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);
