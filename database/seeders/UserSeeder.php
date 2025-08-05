<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['name' => 'Jezelle Grainne S. Tuguic', 'school' => "St. Theresita's School of Tabuk, Inc", 'address' => 'Kalinga'],
            ['name' => 'Franzyn Gail Lumas-e', 'school' => 'University of the Cordilleras', 'address' => 'Benguet'],
            ['name' => 'Sean Dion Mabila Binwag', 'school' => 'Hingyon National High School', 'address' => 'Ifugao'],
            ['name' => 'Tielhart Yullian S. Tero', 'school' => 'Saint Louis School of Pacdal, Inc.', 'address' => 'Benguet'],
            ['name' => 'Ashlyne Joy Biyad Seling', 'school' => 'St. Louis High School of Balatoc Inc.', 'address' => 'Benguet'],
            ['name' => 'Sofia Cassleigh B. Evangelista', 'school' => 'University of the Cordilleras', 'address' => 'Benguet'],
            ['name' => 'OLIVER VIDAD', 'school' => 'Marag Valley Agricultural and Trade High School', 'address' => 'Apayao'],
            ['name' => 'Zevanie B. Basod', 'school' => 'Apayao Community Learning Center', 'address' => 'Apayao'],
            ['name' => 'Christein Sandy P. Sellem', 'school' => 'University of the Cordilleras Integrated School', 'address' => 'Benguet'],
            ['name' => 'Jhen Lorraine S. Pellicer', 'school' => 'Saint Williams Academy Bulanao Inc.', 'address' => 'Kalinga'],
            ['name' => 'Rose-anne Elic Orteg', 'school' => 'APAYAO COMMUNITY LEARNING CENTER', 'address' => 'Apayao'],
            ['name' => 'Brittany Bitot', 'school' => 'Saint Louis School of Pacdal, Inc.', 'address' => 'Benguet'],
            ['name' => 'Airee Chlowee B. Bag-ay', 'school' => "St.Theresita's School of Tabuk, Inc.", 'address' => 'Kalinga'],
            ['name' => 'Gwyneth Faye B. Bagayao', 'school' => 'Abas National High School', 'address' => 'Abra'],
            ['name' => 'Luke Marc P. Camado', 'school' => 'St. Louis High School of Balatoc, Inc', 'address' => 'Benguet'],
            ['name' => 'Genoah Dariel L. Caceres', 'school' => 'Flora National High School', 'address' => 'Apayao'],
            ['name' => 'SIENNA ANGELLI MUAN', 'school' => 'APAYAO SCIENCE HIGH SCHOOL', 'address' => 'Apayao'],
            ['name' => 'Jehu Calinao Jang', 'school' => 'University of the Cordilleras', 'address' => 'Benguet'],
            ['name' => 'Rojohn Pacial G. Egmin', 'school' => 'San Jose School of La Trinidad', 'address' => 'Benguet'],
            ['name' => 'Zelaine L. Marquez', 'school' => 'Bauko Catholic School Inc.', 'address' => 'Mountain address'],
            ['name' => 'Jhaziel Rae T. Pating', 'school' => 'Bauko Catholic School', 'address' => 'Mountain address'],
            ['name' => 'Flyan-Lou D. Balantis', 'school' => "St. William's Academy Bulanao Inc.", 'address' => 'Kalinga'],
            ['name' => 'Lhean Faith A. Sagudan', 'school' => 'San Jose School of La Trinidad Inc.', 'address' => 'Benguet'],
            ['name' => 'Eva Jane Yague', 'school' => 'Marag Valley Agricultural and Trade High School', 'address' => 'Apayao'],
            ['name' => 'KYLLE ISABEL N. PASCUA', 'school' => 'LA PAZ INTEGRATED SCHOOL', 'address' => 'Abra'],
            ['name' => 'Reigel Kurt D. Tongdo', 'school' => "St. Theresita's School of Tabuk, Inc.", 'address' => 'Kalinga'],
            ['name' => 'Klariza Faye Agpuldo', 'school' => 'Marag Valley Agricultural and Trade High School', 'address' => 'Apayao'],
            ['name' => 'Frances Seah A. Filog', 'school' => 'ASHS', 'address' => 'Apayao'],
            ['name' => 'Allea Bagay', 'school' => 'San Isidro National High School', 'address' => 'Abra'],
            ['name' => 'Roel Jeremy S. Daradar', 'school' => 'Flora National High School', 'address' => 'Apayao'],
            ['name' => 'JHOANA NEIL BOSITO', 'school' => 'La Paz Integrated School', 'address' => 'Abra'],
            ['name' => 'Marlon D. Caga', 'school' => 'San Jose School of La Trinidad Inc.', 'address' => 'Benguet'],
            ['name' => 'Jay ann Bitana', 'school' => 'San Isidro National High School', 'address' => 'Abra'],
            ['name' => 'Jolyn Bernice Rivera', 'school' => 'St. Theresita’s High School of Salegseg, Inc.', 'address' => 'Kalinga'],
            ['name' => 'Ceria, Leianne Vale', 'school' => 'Apayao Science High School', 'address' => 'Apayao'],
            ['name' => 'RAIKA JANELLE N. BATAY-AN', 'school' => 'CONNER CENTRAL NATIONAL HIGH SCHOOL', 'address' => 'Apayao'],
            ['name' => 'Christan Clover Banog Flores', 'school' => 'Baay National High School', 'address' => 'Abra'],
            ['name' => 'Adriane Jade B. Seling', 'school' => 'SLHSBI', 'address' => 'Benguet'],
            ['name' => 'Andrei John B. Monteflor', 'school' => 'San Jose School of La Trinidad Inc.', 'address' => 'Benguet'],
            ['name' => 'Vincent Angelo Angpao Toledo Paut', 'school' => 'ISAP-KALINGA', 'address' => 'Kalinga'],
            ['name' => 'Ma. Loraine P. Balanay', 'school' => 'Mataguisi Comprehensive National High School', 'address' => 'Apayao'],
            ['name' => 'Cyron D. Manadao', 'school' => 'Saint Williams Academy Bualanao Inc.', 'address' => 'Kalinga'],
            ['name' => 'Thirdz A. Gaoiran', 'school' => 'Saint Joseph High School of Flora, INC.', 'address' => 'Apayao'],
            ['name' => 'JANE KHAILA A. JIMENEZ', 'school' => 'CONNER CENTRALNATIONAL HIGHSCHOOL', 'address' => 'Apayao'],
            ['name' => 'Adrian G. Rosales', 'school' => "St. Theresita's School of Tabuk, Inc.", 'address' => 'Kalinga'],
            ['name' => 'Mhea Trumpo', 'school' => 'MARAG VALLEY AGRICULTURAL AND TRADE HIGH SCHOOL', 'address' => 'Apayao'],
            ['name' => 'Princess Mylene Tiozon Gamis', 'school' => 'San Jose School of La Trinidad Inc.', 'address' => 'Benguet'],
            ['name' => 'Samuel Iginson U. Langit', 'school' => 'University of the Cordilleras Integrated School', 'address' => 'Benguet'],
            ['name' => 'Shizue Balantis Ando', 'school' => "St. William's Academy, Bulanao Inc.", 'address' => 'Kalinga'],
            ['name' => 'Rowan Hailey B. Baggas', 'school' => "St. Theresita's School of Tabuk, Inc.", 'address' => 'Kalinga'],
        ];
        Student::insertOrIgnore($users);
    }
}
