<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'birthday' => 'before_or_equal:today',
            'avatar' => 'mimes:jpg,png,jpeg',
            'password' => 'max:12',
            'address' => 'regex:/^[A-Za-z0-9À-ỹ,\s\W]+$/',
            'user_name' => 'unique:users',
            'phone' => 'digits:10',
            'name' => 'regex:/^[A-Za-zÀ-ỹ\s]+$/'
        ];
    }
    public function messages()
    {
        return [
            'birthday.before_or_equal' => 'Ngày tháng năm sinh không hợp lệ',
            'avatar.mimes' => 'Kiểu ảnh không đúng định dạng',
            'password.max' => 'Đã vượt quá 12 kí tự',
            'address.regex' => 'Không được có kí tự đặt biệt',
            'user_name.unique' => 'Không được trùng tên',
            'phone.digits' => 'Số điện thoại quy định 10 số',
            'name.regex' => 'Tên chỉ bao gồm chữ cái'
        ];
    }
}
