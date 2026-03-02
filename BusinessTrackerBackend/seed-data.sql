-- ============================================
-- Script para poblar la base de datos
-- Ejecutar en orden: country → region → users → business
-- ============================================

-- ============================
-- 1. COUNTRIES (20 registros)
-- ============================
INSERT INTO country (name) VALUES
('Colombia'),
('México'),
('Argentina'),
('Chile'),
('Perú'),
('Brasil'),
('Ecuador'),
('Uruguay'),
('Paraguay'),
('Bolivia'),
('Venezuela'),
('Costa Rica'),
('Panamá'),
('España'),
('Estados Unidos'),
('Canadá'),
('Alemania'),
('Francia'),
('Japón'),
('Corea del Sur');

-- ============================
-- 2. REGIONS (20 registros)
-- ============================
INSERT INTO region (name, country_id) VALUES
('Bogotá D.C.',        (SELECT id FROM country WHERE name = 'Colombia')),
('Antioquia',          (SELECT id FROM country WHERE name = 'Colombia')),
('Valle del Cauca',    (SELECT id FROM country WHERE name = 'Colombia')),
('Ciudad de México',   (SELECT id FROM country WHERE name = 'México')),
('Jalisco',            (SELECT id FROM country WHERE name = 'México')),
('Buenos Aires',       (SELECT id FROM country WHERE name = 'Argentina')),
('Córdoba',            (SELECT id FROM country WHERE name = 'Argentina')),
('Santiago',           (SELECT id FROM country WHERE name = 'Chile')),
('Lima',               (SELECT id FROM country WHERE name = 'Perú')),
('São Paulo',          (SELECT id FROM country WHERE name = 'Brasil')),
('Río de Janeiro',     (SELECT id FROM country WHERE name = 'Brasil')),
('Quito',              (SELECT id FROM country WHERE name = 'Ecuador')),
('Montevideo',         (SELECT id FROM country WHERE name = 'Uruguay')),
('Asunción',           (SELECT id FROM country WHERE name = 'Paraguay')),
('La Paz',             (SELECT id FROM country WHERE name = 'Bolivia')),
('San José',           (SELECT id FROM country WHERE name = 'Costa Rica')),
('Madrid',             (SELECT id FROM country WHERE name = 'España')),
('California',         (SELECT id FROM country WHERE name = 'Estados Unidos')),
('Berlín',             (SELECT id FROM country WHERE name = 'Alemania')),
('Tokio',              (SELECT id FROM country WHERE name = 'Japón'));

-- ============================
-- 3. USERS (20 registros)
-- password = 'password123' para todos
-- ============================
INSERT INTO users (username, email, password, role, created_at, updated_at) VALUES
('carlos_mendez',    'carlos.mendez@email.com',    'password123', 'USER',  NOW(), NOW()),
('maria_lopez',      'maria.lopez@email.com',      'password123', 'USER',  NOW(), NOW()),
('juan_garcia',      'juan.garcia@email.com',       'password123', 'USER',  NOW(), NOW()),
('ana_martinez',     'ana.martinez@email.com',      'password123', 'USER',  NOW(), NOW()),
('pedro_sanchez',    'pedro.sanchez@email.com',     'password123', 'ADMIN', NOW(), NOW()),
('lucia_fernandez',  'lucia.fernandez@email.com',   'password123', 'USER',  NOW(), NOW()),
('diego_ramirez',    'diego.ramirez@email.com',     'password123', 'USER',  NOW(), NOW()),
('camila_torres',    'camila.torres@email.com',     'password123', 'USER',  NOW(), NOW()),
('andres_herrera',   'andres.herrera@email.com',    'password123', 'USER',  NOW(), NOW()),
('valentina_rojas',  'valentina.rojas@email.com',   'password123', 'USER',  NOW(), NOW()),
('santiago_castro',  'santiago.castro@email.com',    'password123', 'USER',  NOW(), NOW()),
('isabella_moreno',  'isabella.moreno@email.com',   'password123', 'USER',  NOW(), NOW()),
('mateo_vargas',     'mateo.vargas@email.com',      'password123', 'USER',  NOW(), NOW()),
('sofia_ruiz',       'sofia.ruiz@email.com',         'password123', 'USER',  NOW(), NOW()),
('nicolas_ortega',   'nicolas.ortega@email.com',    'password123', 'ADMIN', NOW(), NOW()),
('gabriela_silva',   'gabriela.silva@email.com',    'password123', 'USER',  NOW(), NOW()),
('daniel_romero',    'daniel.romero@email.com',     'password123', 'USER',  NOW(), NOW()),
('paula_navarro',    'paula.navarro@email.com',     'password123', 'USER',  NOW(), NOW()),
('felipe_molina',    'felipe.molina@email.com',     'password123', 'USER',  NOW(), NOW()),
('laura_pena',       'laura.pena@email.com',         'password123', 'USER',  NOW(), NOW());

-- ============================
-- 4. BUSINESS (20 registros)
-- Columnas: business_name, email, initial_investment (expenses), annual_income (income), type, user_id, region_id
-- ============================
INSERT INTO business (business_name, email, initial_investment, annual_income, type, user_id, region_id) VALUES
('TechNova Solutions',
 'contacto@technova.com',       50000, 120000, 'TECNOLOGY',
 (SELECT id FROM users WHERE username = 'carlos_mendez'),
 (SELECT id FROM region WHERE name = 'Bogotá D.C.')),

('Sabor Colombiano',
 'info@saborcolombiano.com',    30000,  85000, 'RESTAURANT',
 (SELECT id FROM users WHERE username = 'maria_lopez'),
 (SELECT id FROM region WHERE name = 'Antioquia')),

('EcoTienda Verde',
 'ventas@ecotienda.com',        15000,  45000, 'STORE',
 (SELECT id FROM users WHERE username = 'juan_garcia'),
 (SELECT id FROM region WHERE name = 'Valle del Cauca')),

('ConsultPro MX',
 'hola@consultpro.mx',          20000,  90000, 'SERVICE',
 (SELECT id FROM users WHERE username = 'ana_martinez'),
 (SELECT id FROM region WHERE name = 'Ciudad de México')),

('MercadoYa Online',
 'soporte@mercadoya.com',       10000, 200000, 'ONLINE',
 (SELECT id FROM users WHERE username = 'pedro_sanchez'),
 (SELECT id FROM region WHERE name = 'Jalisco')),

('BuenosAires Café',
 'cafe@bairescafe.com',         25000,  60000, 'RESTAURANT',
 (SELECT id FROM users WHERE username = 'lucia_fernandez'),
 (SELECT id FROM region WHERE name = 'Buenos Aires')),

('Digital Andes',
 'info@digitalandes.com',       40000, 150000, 'TECNOLOGY',
 (SELECT id FROM users WHERE username = 'diego_ramirez'),
 (SELECT id FROM region WHERE name = 'Lima')),

('Moda Santiago',
 'contacto@modasantiago.cl',    18000,  55000, 'STORE',
 (SELECT id FROM users WHERE username = 'camila_torres'),
 (SELECT id FROM region WHERE name = 'Santiago')),

('DeliExpress',
 'pedidos@deliexpress.com',     12000,  70000, 'RESTAURANT',
 (SELECT id FROM users WHERE username = 'andres_herrera'),
 (SELECT id FROM region WHERE name = 'Bogotá D.C.')),

('CloudServ Brasil',
 'contato@cloudserv.br',        60000, 250000, 'TECNOLOGY',
 (SELECT id FROM users WHERE username = 'valentina_rojas'),
 (SELECT id FROM region WHERE name = 'São Paulo')),

('Artesanías del Pacífico',
 'ventas@artesanias.co',         8000,  30000, 'STORE',
 (SELECT id FROM users WHERE username = 'santiago_castro'),
 (SELECT id FROM region WHERE name = 'Valle del Cauca')),

('Asesoría Legal Express',
 'legal@asesorialegal.com',     22000,  95000, 'SERVICE',
 (SELECT id FROM users WHERE username = 'isabella_moreno'),
 (SELECT id FROM region WHERE name = 'Madrid')),

('FitLife App',
 'hello@fitlifeapp.com',        35000, 180000, 'ONLINE',
 (SELECT id FROM users WHERE username = 'mateo_vargas'),
 (SELECT id FROM region WHERE name = 'California')),

('Berlín Tech Hub',
 'info@berlintechhub.de',       70000, 300000, 'TECNOLOGY',
 (SELECT id FROM users WHERE username = 'sofia_ruiz'),
 (SELECT id FROM region WHERE name = 'Berlín')),

('Sushi Tokio Express',
 'reservas@sushitokio.jp',      28000,  75000, 'RESTAURANT',
 (SELECT id FROM users WHERE username = 'nicolas_ortega'),
 (SELECT id FROM region WHERE name = 'Tokio')),

('EduOnline Latam',
 'cursos@eduonline.com',        15000, 110000, 'ONLINE',
 (SELECT id FROM users WHERE username = 'gabriela_silva'),
 (SELECT id FROM region WHERE name = 'Quito')),

('Transporte Rápido',
 'servicios@transrapido.com',   45000, 130000, 'SERVICE',
 (SELECT id FROM users WHERE username = 'daniel_romero'),
 (SELECT id FROM region WHERE name = 'Montevideo')),

('GreenMarket Orgánico',
 'info@greenmarket.com',        20000,  65000, 'STORE',
 (SELECT id FROM users WHERE username = 'paula_navarro'),
 (SELECT id FROM region WHERE name = 'San José')),

('InnovaApps',
 'dev@innovaapps.com',          55000, 220000, 'TECNOLOGY',
 (SELECT id FROM users WHERE username = 'felipe_molina'),
 (SELECT id FROM region WHERE name = 'Bogotá D.C.')),

('Panadería La Abuela',
 'pedidos@laabuela.com',         9000,  40000, 'RESTAURANT',
 (SELECT id FROM users WHERE username = 'laura_pena'),
 (SELECT id FROM region WHERE name = 'Antioquia'));
