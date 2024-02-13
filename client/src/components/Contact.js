var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };
    useEffect(() => {
        const fetchLandlord = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`/api/user/${listing.userRef}`);
                const data = yield res.json();
                setLandlord(data);
            }
            catch (error) {
                console.log(error);
            }
        });
        fetchLandlord();
    }, [listing.userRef]);
    return (<>
      {landlord && (<div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea name='message' id='message' rows='2' value={message} onChange={onChange} placeholder='Enter your message here...' className='w-full border p-3 rounded-lg'></textarea>

          <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
            Send Message          
          </Link>
        </div>)}
    </>);
}
