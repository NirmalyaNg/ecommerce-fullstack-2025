import AddProductForm from '@/components/admin/AddProductForm';

const AddProductPage = () => {
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3'>
          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
