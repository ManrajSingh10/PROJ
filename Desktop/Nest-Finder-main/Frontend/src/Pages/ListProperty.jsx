import React, { useEffect, useState } from 'react';
import Basic from '../Components/ListProperty/Basic';
import Details from '../Components/ListProperty/Details';
import Media from '../Components/ListProperty/Media';
import Pricing from '../Components/ListProperty/Pricing';
import Confirmation from '../Components/ListProperty/Confirmation';
import axios from 'axios';
import {isLoggedin, backend} from '../Helper'
import{useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {changeMsg} from '../Redux/userSlice'
import LoadingComponent from '../Components/LoadingComponent'

const StepNavigation = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [property, setProperty] = useState({
    title: '',
    propType: '',
    listingType: 'Sale',
    address: '',
    neighborhood : '',
    city: '',
    state: '',
    zip: '',
    area: '',
    bedrooms: '',
    floor: '',
    parkingAvailable: false,
    furnishingStatus: '',
    propAge: '',
    description: '',
    paymentTerms:'Monthly',
    amount:'',
    securityDeposit: '',
    negotiability:true,
    currency:'USD',
    msgThroughApp:true,
    msgThroughPhone:false,
    msgThroughEmail:false,
    phone:'',
    email:'',
    // media:''
  });
  const [propImage, setPropimage] = useState()
  const [maxPage, setMaxPage] = useState(1)
  const naivgate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
    const local = JSON.parse(sessionStorage.getItem("ListItem"))
    if(local) setProperty(local)
    const curPage = JSON.parse(sessionStorage.getItem("ListItemCurPage"))
    if(curPage) setActiveStep(curPage) 
    const maxPageLocal = JSON.parse(sessionStorage.getItem("ListItemMaxPage"))
    if(maxPageLocal) setMaxPage(maxPageLocal) 
  },[])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setProperty((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    }
    
    else if (type === 'radio') {
      setProperty((prevState) => ({
        ...prevState,
        [name]: value === 'true', 
      }));
    }
  
    else {
      setProperty((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (!isLoggedin()) {
      naivgate("/login")
    }
  },[])
  
  // For Saving Data Locally
  useEffect(() => {
    if(!property.title) return
    sessionStorage.setItem("ListItem", JSON.stringify(property));
    sessionStorage.setItem("ListItemCurPage",JSON.stringify(activeStep))
    sessionStorage.setItem("ListItemMaxPage",JSON.stringify(maxPage))
  }, [property,activeStep,maxPage]);
  
  const handleStepClick = (step) => {
    if (step > maxPage) return
    setActiveStep(step);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(activeStep===5){
      dispatch(changeMsg("Listing Your Property..."))
      setLoading(true)
      try {
        const response = await axios.post(`${backend}/property/listProperty`,property,{withCredentials:true})
        
        if(propImage) {
          const formData = new FormData()
          formData.append("image",propImage)
          formData.append("index",0)
          try {
            await axios.patch(
              `${backend}/property/editImageInfo/${response.data.property._id}`,
              formData,
              {withCredentials:true}
            )
            setMedia(response.data.media)
          } catch (error) {
            console.error("error in updating image",error)
          }
        }
        dispatch(changeMsg("Your property has been listed!!!"));
        sessionStorage.clear()
        naivgate("/")
        window.location.reload()
      } catch (error) {
        alert("Error")
        console.error(error)
      } finally{
        setLoading(false)
      }
    }
    else{
      setMaxPage(Math.max(maxPage, activeStep + 1))
      setActiveStep(activeStep+1); 
    }
  };

  const steps = [
    { number: 1, label: 'Basic', icon: 'check' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Media' },
    { number: 4, label: 'Pricing' },
    { number: 5, label: 'Confirmation' },
  ];

  return (
    <>
      {/* Heading */}
      <div className='ml-14 md:ml-64 px-2 md:px-20 py-5 flex items-center justify-between'>
        <h1 className='text-2xl lg:text-4xl font-bold dark:text-white'>List Your Property &rarr;</h1>
        {/* Saved Locally Section */}
        <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 11.586l7.293-7.293a1 1 0 0 1 1.414 0z" />
          </svg>
          <span className="font-medium">Saved Locally</span>
        </div>
      </div>

      {/* Completion Line */}
      <div className=' ml-14 md:ml-64 lg:ml-80 xl:ml-96'>
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          {steps.map((step) => {
            const isActive = activeStep === step.number;
            const isCompleted = activeStep > step.number;

            return (
              <li
                key={step.number}
                className={`flex md:w-full items-center ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-500'
                    : isCompleted
                    ? 'text-green-600 dark:text-green-500'
                    : 'text-gray-500 dark:text-gray-400'
                } sm:after:content-[''] cursor-pointer mt-4 ${step.number !== 5 ? 'after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after-hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700' : ''}`}
                onClick={() => handleStepClick(step.number)}
              >
                <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}>
                  {step.number <= maxPage && (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  )}
                  {step.number === 1 ? (
                    <span className="flex items-center after:text-gray-200 dark:after:text-gray-500">
                      Basic <span className="hidden sm:inline-flex sm:ms-2"></span>
                    </span>
                  ) : (
                    <>
                      <span className="me-2">{step.number}</span>
                      {step.label}
                    </>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {
        activeStep===1 && <Basic property={property} handleChange={handleChange} handleSubmit={handleSubmit} />
      }
      {
        activeStep===2 && <Details property={property} handleChange={handleChange} handleSubmit={handleSubmit} />
      }
      {
        activeStep===3 && <Media property={propImage} handleChange={handleChange} handleSubmit={handleSubmit} setProperty={setPropimage} />
      }
      {
        activeStep===4 && <Pricing property={property} handleChange={handleChange} handleSubmit={handleSubmit}/>
      }
      {
        activeStep===5 && <Confirmation property={property} handleChange={handleChange} handleSubmit={handleSubmit} />
      }

      {loading && <LoadingComponent/>}    
    </>
  );
};

export default StepNavigation;
