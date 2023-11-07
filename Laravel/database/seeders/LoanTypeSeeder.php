<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LoanType;
use Str;

class LoanTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $loanTypes = [
            [
                'name'  =>  'Business Loan',
                'detail'  =>  "Select the best offer curated just for you from a wide choice of Banks & NBFC's",
                'media'  =>  'http://thegenius.co/html/loanplus/preview/asset/img/icon-1.png',
            ],
            [
                'name'  =>  'Personal Loan',
                'detail'  =>  "Select the best offer curated just for you from a wide choice of Banks & NBFC's",
                'media'  =>  'http://thegenius.co/html/loanplus/preview/asset/img/icon-1.png',
            ],
            [
                'name'  =>  'Home Loan',
                'detail'  =>  "Select the best offer curated just for you from a wide choice of Banks & NBFC's",
                'media'  =>  'http://thegenius.co/html/loanplus/preview/asset/img/home.png',
            ],
            [
                'name'  =>  'Auto Loan',
                'detail'  =>  "Select the best offer curated just for you from a wide choice of Banks & NBFC's",
                'media'  =>  'http://thegenius.co/html/loanplus/preview/asset/img/icon-1.png',
            ],
            [
                'name'  =>  'Loan Against Property',
                'detail'  =>  "Select the best offer curated just for you from a wide choice of Banks & NBFC's",
                'media'  =>  'http://thegenius.co/html/loanplus/preview/asset/img/home.png',
            ],
            [
                'name'  =>  'Loan Against Security',
                'detail'  =>  "Select the best offer curated just for you from a wide choice of Banks & NBFC's",
                'media'  =>  'http://thegenius.co/html/loanplus/preview/asset/img/icon-1.png',
            ],
            [
                'name'  =>  'Gold Loan',
                'detail'  =>  "Select the best offer curated just for you from a wide choice of Banks & NBFC's",
                'media'  =>  'http://thegenius.co/html/loanplus/preview/asset/img/icon-1.png',
            ],
        ];

        foreach ($loanTypes as $key => $value) {
            $loan = new LoanType;
            $loan->name = $value['name'];
            $loan->slug = Str::slug($value['name']);
            $loan->detail = $value['detail'];
            $loan->media = $value['media'];
            $loan->save();
        }

    }
}
