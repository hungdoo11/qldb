<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBookRequest extends FormRequest
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
            "name" => 'regex:/^[A-Za-zÃ-ỹ0-9\s\W]+$/',
            "author" => 'regex:/^[A-Za-zÃ-ỹ\s]+$/',
            "avatar" => 'mimes:jpg,png,jpeg,webp',
            "price" => 'numeric|min:0',
            "quantity" => 'numeric',
            "ngay_xuat_ban" => 'before_or_equal:today',
            "category_id" => 'numeric',
            "factory_id" => 'numeric',
            "description" => 'required',
            "status" => 'required',
        ];
    }
    public function messages()
    {
        return [
            "name.regex" => 'Tên sách không hợp lệ.',
            "author.regex" => 'Tên tác giả không hợp lệ.',
            "avatar.mimes" => 'Chỉ nhận ảnh có đuôi png, jpeg và jpg.',
            "price.numeric" => 'giá tiền phải là số thực.',
            "quantity.numeric" => 'số lượng phải là số thực.',
            "ngay_xuat_ban.before_or_equal" => 'Ngày không được quá ngày hiện tại.',
            "category_id.numeric" => 'Mục phân loại không hợp lệ.',
            "factory_id.numeric" => 'Mục nhà máy sản xuất không hợp lệ.', 
            "description.required" => 'Không được bỏ trống mô tả.',
            "status.required" => 'Không được bỏ trống trạng thái.',
        ];
    }
}
