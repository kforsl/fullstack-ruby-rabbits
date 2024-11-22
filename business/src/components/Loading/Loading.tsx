import './loading.css';

interface Props {
    isLoading: boolean;
}

const Loading = ({ isLoading }: Props) => {
    return (
        <>
            <article className={`main-loader-wrapper main-loader-wrapper--${isLoading ? 'active' : 'inactive'}`}>
                <section className='loader-container'>
                    <section className='loader'></section>
                    <p className='loader__text'>Laddar...</p>
                </section>
            </article>
        </>
    );
};

export default Loading;
