type Props = {
    name: string;
    email: string;
    picture: string;
  };
  
  export const Profile = ({ name, email, picture }: Props) => {
    return (
      <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-md">
        <img src={picture} alt={name} className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
    );
  };
  