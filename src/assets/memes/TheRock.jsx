
function TheRock() {
    return (
        <div>
            <div
                style={{
                    width: "100%",
                    height: 0,
                    paddingBottom: "0%",
                    position: "relative"
                }}
            >
                <iframe
                    src="https://giphy.com/embed/hrBmVoBi0dekru0VdP"
                    width="50px"
                    height="50px"
                    style={{ position: "absolute" }} 
                    className="giphy-embed"
                    allowFullScreen=""
                />
            </div> 
        </div>
    )
}

export default TheRock
