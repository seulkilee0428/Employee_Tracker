9use employeesDB;

INSERT INTO department
    (name)
VALUES
    ('IT'),
    ('Business'),
    ('Sales'),
    ('Finace');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('IT Manager', 150000, 1),
    ('Software Engineer', 100000, 1),
    ('Business Manager', 130000, 2),
    ('Product Owner', 80000, 2),
    ('Sales Manager', 120000, 3),
    ('Sales Analyst', 70000, 3),
    ('Finance Manager', 130000, 4),
    ('Finance Analyst', 85000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jay', 'Money', 1, NULL),
    ('Sniggy', 'ThePixel', 2, 1),
    ('Dragon', 'Fire', 3, NULL),
    ('Slee', 'Too', 4, 3),
    ('Minnie', 'Mouse', 5, NULL),
    ('Elsa', 'Frozen', 6, 5),
    ('Monna', 'Maui', 7, NULL),
    ('Colony', 'Lewisville', 8, 7);