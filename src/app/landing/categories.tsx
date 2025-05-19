export default function Categories() {
    return(
        <section className="col-span-2">
            <div className="px-4 py-2 rounded-lg flex items-center justify-center bg-(--foreground)">
                <h2 className="font-bold text-white">Categories</h2>
            </div>
            <section>
                <div className="flex justify-between p-1">
                    <a href="#">Farming Techniques</a>
                    <p>(1)</p> {/*Later would be change to actually represent real time numbers */}
                </div>
                <div className="flex justify-between p-1">
                    <a href="#">Recycling</a>
                    <p>(2)</p> {/*Later would be change to actually represent real time numbers */}
                </div>
                <div className="flex justify-between p-1">
                    <a href="#">News</a>
                    <p>(1)</p> {/*Later would be change to actually represent real time numbers */}
                </div>
            </section>
        </section>
    );
}